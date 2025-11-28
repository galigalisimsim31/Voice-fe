import axios from 'axios';
import { toast } from 'react-hot-toast';
import { LOCAL_STORAGE_KEY, ROUTES } from '../constants/constant';
import { setGlobalLoading } from '../contexts/LoaderContext';

const skip401Urls = [
  '/login',
  '/forgot-password',
  '/verify-otp',
  '/reset-password',
  '/verify-email',
];

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

// Track only requests that should show the loader
let inFlightWithLoader = 0;

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(LOCAL_STORAGE_KEY.TOKEN_KEY);
    if (token) {
      config.headers.Authorization = `Bearer ${JSON.parse(token)}`;
    }
    // 👇 default: show loader unless explicitly skipped
    const skipLoader = config?.skipLoader === true;
    config.skipLoader = skipLoader; // normalize

    if (!skipLoader) {
      inFlightWithLoader += 1;
      setGlobalLoading(true);
    }
    return config;
  },
  (error) => {
    // request never went out — nothing to decrement
    setGlobalLoading(false);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    if (!response.config?.skipLoader) {
      inFlightWithLoader = Math.max(0, inFlightWithLoader - 1);
      if (inFlightWithLoader === 0) setGlobalLoading(false);
    }
    return response?.data;
  },
  (error) => {
    const cfg = error.config || {};
    if (!cfg.skipLoader) {
      inFlightWithLoader = Math.max(0, inFlightWithLoader - 1);
      if (inFlightWithLoader === 0) setGlobalLoading(false);
    }

    // Ignore aborted/canceled requests (optional but handy)
    if (axios.isCancel?.(error) || error.code === 'ERR_CANCELED') {
      return Promise.reject(error);
    }

    if (error.response) {
      const { status, config } = error.response;
      const shouldSkip401 = skip401Urls.some((skipPath) =>
        config?.url?.includes(skipPath)
      );

      if (status === 401 && !shouldSkip401) {
        toast.error('Session expired. Please log in again.');
        if (typeof window === 'undefined') return;
        const keys = Object.keys(localStorage);
        for (const k of keys) {
          if (!k.startsWith('isRemember')) localStorage.removeItem(k);
        }

        // build safe redirect (path+query+hash only)
        const { pathname, search, hash } = window.location;
        const current = pathname + search + hash;

        // avoid redirecting back to /login to prevent loops
        const fallback = '/';
        const safeCurrent = pathname.startsWith('/login') ? fallback : current;

        const redirectParam = encodeURIComponent(safeCurrent);

        // send to login with ?redirect=...
        window.location.href = `${ROUTES.LOGIN}?redirect=${redirectParam}`;
      }
    } else {
      toast.error('Network error. Please try again.');
    }

    return Promise.reject(error);
  }
);

export default api;

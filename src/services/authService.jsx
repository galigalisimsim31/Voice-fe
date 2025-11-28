import { LOCAL_STORAGE_KEY } from '../constants/constant';
import api from './axios';

const AuthService = {
  login: (data) => api.post('/v1/user/auth/login', data),
  register: (data, from = '') =>
    api.post(`/v1/user/auth/register?from=${from}`, data),
  forgot: (data) => api.post('/v1/user/auth/forgot-password', data),
  forgotLink: (data) => api.post('/v1/user/auth/forgot-password-link', data),
  verify: (data) => api.post('/v1/user/auth/verify-otp', data),
  reset: (data) => api.post('/v1/user/auth/reset-password', data),
  resetByLink: (data) => api.post('/v1/user/auth/reset-password-by-link', data),
  verifyEmail: (token) => api.get(`/v1/user/auth/verify-email?token=${token}`),
  logout: (query = '') => api.get(`/v1/user/auth/logout${query}`),
  logoutKeepalive: async (query = '') => {
    const url = `${import.meta.env.VITE_API_BASE_URL}/v1/user/auth/logout${query}`;

    const token = localStorage.getItem(LOCAL_STORAGE_KEY.TOKEN_KEY);

    try {
      // Use fetch with keepalive so the request can complete while closing
      await fetch(url, {
        method: 'GET', // (POST is better semantics, but keep GET if your server expects it)
        keepalive: true,
        // If you’re cookie-authenticated, include credentials:
        // credentials: "include",
        headers: token
          ? { Authorization: `Bearer ${JSON.parse(token)}` }
          : undefined, // remove if you use cookies only
      });
    } catch {
      // Swallow errors; the page might be closing
    }
  },
  validateToken: (token) =>
    api.get(`/v1/user/auth/validate-user?token=${token}`),
  verifyResetLink: (token) =>
    api.get(`/v1/user/auth/verify-link?token=${token}`),
};

export default AuthService;

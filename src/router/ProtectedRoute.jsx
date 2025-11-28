import { Navigate, Outlet } from 'react-router-dom';
import { useLocalStorageUtil } from '../utils/localStorageUtil';
import { LOCAL_STORAGE_KEY, ROUTES } from '../constants/constant';

const ProtectedRoute = (isStatic = false) => {
    const { getItem } = useLocalStorageUtil();

    const token = getItem(LOCAL_STORAGE_KEY?.TOKEN_KEY, "String"); // or use context/auth service

    // build safe redirect (path+query+hash only)
    const { pathname, search, hash } = window.location;
    const current = pathname + search + hash;

    // avoid redirecting back to /login to prevent loops
    const fallback = '/';
    const safeCurrent = pathname.startsWith('/login') ? fallback : current;

    const redirectParam = encodeURIComponent(safeCurrent);

    // send to login with ?redirect=...
    return token ? <Outlet /> : <Navigate to={`${ROUTES.LOGIN}?redirect=${redirectParam}`} replace />;
};

export default ProtectedRoute;

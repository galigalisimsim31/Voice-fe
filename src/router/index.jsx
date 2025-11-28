import { lazy, Suspense } from 'react';
// Import Navigate for the root redirect
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout';
import ProtectedRoute from './ProtectedRoute';
import { ROUTES } from '../constants/constant';
import { Backdrop, CircularProgress } from '@mui/material';

// --- Auth Pages ---
const LoginPage = lazy(() => import('../pages/Login'));
const RegisterPage = lazy(() => import('../pages/Register'));
const ForgotPage = lazy(() => import('../pages/Forgot'));
const ResetPasswordPage = lazy(() => import('../pages/ResetPassword'));
const VerifyEmailPage = lazy(() => import('../pages/VerifyEmail'));

// --- Dashboard/App Pages ---
// FIX 1: Corrected typo 'Dashbaord' -> 'DashboardPage'
const DashboardPage = lazy(() => import('../pages/Dashbaord')); 
// FIX 2: Corrected 'CallMetrics' -> 'CallMetricsPage' (to match files I gave you)
const CallMetricsPage = lazy(() => import('../pages/CallMetrics')); 
// FIX 3: Corrected 'VoiceAgent' -> 'AIVoiceAgentPage' (to match files I gave you)
const AIVoiceAgentPage = lazy(() => import('../pages/VoiceAgent'));

const NotFoundPage = lazy(() => import('../pages/NotFoundPage'));
// const HomePage = lazy(() => import('../pages/Home')); // No longer needed

function AppRouter() {
  return (
    <Router basename="/">
      <Suspense
        fallback={
          <Backdrop open={true} sx={{ zIndex: 1300, color: '#fff' }}>
            <CircularProgress color="inherit" />
          </Backdrop>
        }
      >
        <Routes>
          {/* --- Auth Routes (No Layout) --- */}
          <Route path={ROUTES?.LOGIN} element={<LoginPage />} />
          <Route path={ROUTES?.REGISTER} element={<RegisterPage />} />
          <Route path={ROUTES?.FORGOT} element={<ForgotPage />} />
          <Route path={ROUTES?.RESET} element={<ResetPasswordPage />} />
          <Route path={ROUTES?.VERIFY_EMAIL} element={<VerifyEmailPage />} />

          {/* --- Protected App Routes (With Layout) ---
            This is the correct structure.
            The DashboardLayout route wraps all the main app pages.
          */}
          <Route element={<ProtectedRoute isStatic={true} />}>
            <Route element={<DashboardLayout />}>
              <Route path={ROUTES?.DASHBOARD} element={<DashboardPage />} />
              <Route path={ROUTES?.CALL_METRICS} element={<CallMetricsPage />} />
              <Route path={ROUTES?.AI_VOICE_AGENT} element={<AIVoiceAgentPage />} />
              {/* Add other protected pages (like /profile) here */}
            </Route>
          </Route>

          {/* --- Redirect root path / to login --- */}
          <Route path="/" element={<Navigate to={ROUTES.LOGIN} replace />} />

          {/* --- Catch-all 404 Route --- */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default AppRouter;
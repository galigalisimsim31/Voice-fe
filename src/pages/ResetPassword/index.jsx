import { useNavigate, useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  Box,
  Typography,
  CircularProgress,
  Paper,
  Container,
} from '@mui/material';
import { MuiButton, MuiInput } from '../../features';
import { ROUTES } from '../../constants/constant';
import AuthService from '../../services/authService';
import { toast } from 'react-hot-toast';
import ErrorIcon from '@mui/icons-material/Error';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useEffect, useState } from 'react';

// 1. Import AuthLayout
import AuthLayout from '../../components/authLayout';

const schema = yup.object().shape({
  password: yup
    .string()
    .required('Password is required.')
    .min(8, 'Password must be at least 8 characters.')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter.')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter.')
    .matches(/[0-9]/, 'Password must contain at least one number.')
    .matches(
      /[^a-zA-Z0-9]/,
      'Password must contain at least one special character.'
    ),
  confirmPassword: yup
    .string()
    .required('Confirm password is required.')
    .oneOf([yup.ref('password')], 'Passwords do not match.'),
});

export default function ResetPasswordPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  const [showPassword, setShowPassword] = useState(false);
  const [validateToken, setValidateToken] = useState(false);
  const [validateTokenError, setValidateTokenError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const validateLink = async () => {
    try {
      await AuthService.verifyResetLink(token);
      setValidateToken(true);
      setValidateTokenError('');
    } catch (error) {
      setValidateToken(false);
      setValidateTokenError(
        error?.response?.data?.message || 'Link Expired or Invalid'
      );
    }
  };

  useEffect(() => {
    if (token) {
      validateLink();
    } else {
      navigate(ROUTES.LOGIN);
    }
  }, []);

  const onSubmit = async (data) => {
    try {
      await AuthService.resetByLink({
        newPassword: data?.password,
        token: token,
      });
      toast.success(
        'Your password has been successfully updated. Please log in.'
      );
      navigate(ROUTES.LOGIN);
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed to reset password!');
    }
  };

  // 2. Use standard Login Page input styles
  const inputStyles = {
    mb: 2,
    '& .MuiOutlinedInput-root': {
      backgroundColor: '#fff',
      borderRadius: '8px',
    },
    '& h6.form-label': {
      color: 'rgba(0, 0, 0, 1)',
      fontWeight: 500,
      minHeight: '24px',
      marginBottom: '4px',
    },
    '& .error': {
      color: 'rgba(193, 7, 1, 1)',
    },
    '& .MuiIconButton-root': {
      '&:hover': {
        backgroundColor: 'transparent',
      },
      '& .MuiTouchRipple-root': {
        display: 'none',
      },
    },
  };

  return (
    <>
      {!validateToken ? (
        // Loading / Error View (Kept separate so it doesn't look empty in the layout)
        <Container maxWidth="sm">
          <Paper
            elevation={3}
            sx={{ padding: 4, mt: 8, textAlign: 'center', borderRadius: 3 }}
          >
            {!validateTokenError ? (
              <>
                <CircularProgress />
                <Typography variant="h6" mt={2}>
                  Verifying your link...
                </Typography>
              </>
            ) : (
              <>
                <ErrorIcon color="error" sx={{ fontSize: 48 }} />
                <Typography variant="h6" mt={2} color="error">
                  {validateTokenError}
                </Typography>
                <Typography variant="body2" color="primary" sx={{ mt: 2 }}>
                  For more detail contact voiceagent support team
                </Typography>
              </>
            )}
          </Paper>
        </Container>
      ) : (
        // 3. Success View - Using AuthLayout
        <AuthLayout>
          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
            <Typography
              sx={{
                fontWeight: '700',
                mb: 1,
                color: 'rgba(0, 0, 0, 1)',
                textAlign: 'center',
                fontSize: '30px',
              }}
            >
              Reset Password
            </Typography>
            <Typography
              sx={{
                color: 'rgba(69, 69, 69, 1)',
                mb: 4,
                fontWeight: '700',
                textAlign: 'center',
                fontSize: '15px',
              }}
            >
              Choose a strong password you haven’t used before.
            </Typography>

            {/* Password Input */}
            <MuiInput
              label="Password"
              type={showPassword ? 'text' : 'password'}
              placeholder="*********"
              {...register('password')}
              error={Boolean(errors.password)}
              helperText={errors.password?.message}
              isRequired
              endIcon={showPassword ? <VisibilityOff /> : <Visibility />}
              handleEndIconClick={() => setShowPassword((prev) => !prev)}
              sx={inputStyles}
            />

            {/* Confirm Password Input */}
            <MuiInput
              label="Confirm Password"
              type={showPassword ? 'text' : 'password'}
              placeholder="*********"
              {...register('confirmPassword')}
              error={Boolean(errors.confirmPassword)}
              helperText={errors.confirmPassword?.message}
              isRequired
              endIcon={showPassword ? <VisibilityOff /> : <Visibility />}
              handleEndIconClick={() => setShowPassword((prev) => !prev)}
              sx={inputStyles}
            />

            {/* Submit Button */}
            <MuiButton
              text={'Reset Password'}
              type="submit"
              fullWidth
              sx={{
                marginTop: '2rem',
                fontWeight: '500',
                backgroundColor: 'rgba(31, 44, 94, 1)',
                padding: '6px 30px',
                fontSize: '15px',
                height: '55px',
              }}
            />

            {/* Back Button */}
           <MuiButton
  text={'Back to Login'}
  type="button"
  variant="outlined"
  fullWidth
  sx={{
    marginTop: '1rem',
    fontWeight: '500',
    color: 'rgba(31, 44, 94, 1)',
    borderColor: 'rgba(31, 44, 94, 1)',
    padding: '6px 30px',
    fontSize: '15px',
    height: '55px',
    '&:hover': {
      borderColor: 'rgba(25, 35, 75, 1)',
      backgroundColor: 'transparent', // <--- CONFIRMED: This removes the background fill
    },
  }}
  handleOnClick={() => navigate(ROUTES.LOGIN)}
/>
          </Box>
        </AuthLayout>
      )}
    </>
  );
}
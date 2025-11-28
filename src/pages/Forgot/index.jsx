import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Box, Typography } from '@mui/material';
import { MuiButton, MuiInput } from '../../features';
import { ROUTES } from '../../constants/constant';
import { toast } from 'react-hot-toast';
import AuthService from '../../services/authService';
import AuthLayout from '../../components/authLayout/index'; // Import Layout

// Icons
import EmailIcon from '../../assets/icons/email_icon.svg';

const schema = yup.object().shape({
  email: yup
    .string()
    .trim()
    .required('Email is required.')
    .email('Invalid email format.'),
});

export default function ForgotPage() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      await AuthService.forgotLink({ email: data?.email });
      toast.success(
        'A password reset link has been sent to your registered email.'
      );
      navigate(ROUTES.LOGIN);
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed to send Link!');
    }
  };

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
    '& .error': { color: 'rgba(193, 7, 1, 1)' },
  };

  const submitButtonStyles = {
    marginTop: '2rem',
    fontWeight: '500',
    backgroundColor: 'rgba(31, 44, 94, 1)',
    padding: '6px 30px',
    fontSize: '15px',
    height: '55px',
  };

  const backButtonStyles = {
    marginTop: '1rem',
    fontWeight: 600,
    color: 'rgba(31, 44, 94, 1)',
    borderColor: 'rgba(31, 44, 94, 1)',
    padding: '6px 30px',
    fontSize: '15px',
    height: '55px',
    backgroundColor: 'transparent',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderRadius: '8px',
    '&.MuiButton-outlined': {
      borderColor: 'rgba(31, 44, 94, 1)',
      color: 'rgba(31, 44, 94, 1)',
      backgroundColor: 'transparent',
    },
    '&.MuiButton-outlinedPrimary': {
      borderColor: 'rgba(31, 44, 94, 1)',
      color: 'rgba(31, 44, 94, 1)',
      backgroundColor: 'transparent',
    },
  };

  return (
    <AuthLayout>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <Typography
          sx={{
            fontWeight: '500',
            mb: 1,
            color: 'rgba(0, 0, 0, 1)',
            textAlign: 'center',
            fontSize: '30px',
          }}
        >
          Forgot Password
        </Typography>
        <Typography
          sx={{
            color: 'rgba(69, 69, 69, 1)',
            mb: 4,
            fontWeight: '500',
            textAlign: 'center',
            fontSize: '15px',
          }}
        >
          Please enter your registered email address to reset your password.
        </Typography>

        <MuiInput
          label="Email"
          isRequired={true}
          placeholder="Enter Email Here"
          {...register('email')}
          error={Boolean(errors.email)}
          helperText={errors.email?.message}
          endIcon={
            <img
              src={EmailIcon}
              alt="Email"
              style={{ width: 20, height: 20, marginRight: 20 }}
            />
          }
          sx={inputStyles}
        />

        <MuiButton
          text={'Submit'}
          type="submit" // Changed to submit
          fullWidth
          sx={submitButtonStyles}
          // Removed handleOnClick to allow form submission
        />

        <MuiButton
          text={'Back to Login'}
          type="button"
          variant="outlined"
          fullWidth
          sx={backButtonStyles}
          handleOnClick={() => navigate(ROUTES.LOGIN)}
        />
      </Box>
    </AuthLayout>
  );
}

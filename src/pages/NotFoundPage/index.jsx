import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { BUTTON_LABEL, ROUTES } from '../../constants/constant';
import { MuiButton } from '../../features';

const NotFoundPage = () => {
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                minHeight: '100vh',
                backgroundColor: '#f8fafc',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                px: 3,
            }}
        >
            <ErrorOutlineIcon sx={{ fontSize: 80, color: '#1976d2', mb: 2 }} />

            <Typography variant="h2" fontWeight="bold" color="primary" gutterBottom>
                404
            </Typography>

            <Typography variant="h5" fontWeight={600} mb={1}>
                Lost in the Voice Agent AI?
            </Typography>

            <Typography variant="body1" color="text.secondary" maxWidth={420} mb={4}>
                The page you're looking for doesn't exist or might have been moved.
                Let's guide you back to your dashboard.
            </Typography>

            <MuiButton handleOnClick={() => navigate(ROUTES.DASHBOARD)} text={BUTTON_LABEL.GO_TO_DASHBOARD} variant="contained" />
        </Box>
    );
};

export default NotFoundPage;

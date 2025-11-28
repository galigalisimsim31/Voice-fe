import {
    AppBar,
    Box,
    Toolbar,
    Menu,
    useMediaQuery
} from '@mui/material';
import { useState } from 'react';
import { useLocalStorageUtil } from '../utils/localStorageUtil';
import { ROUTES } from '../constants/constant';
import { MuiButton } from '../features';
import toast from 'react-hot-toast';
import AuthService from '../services/authService';
import styles from "./index.module.css";
import { useNavigate } from 'react-router-dom';

const POLL_MS = 20000;

const TopHeader = ({ showHeader }) => {
    const isMobile = useMediaQuery("(max-width:600px)");
    const navigate = useNavigate();

    const { clear, getItem } = useLocalStorageUtil();
    const [anchorEl, setAnchorEl] = useState(null);
    const userDataLocal = getItem("userData");
    const userName = userDataLocal?.fullName ? userDataLocal?.fullName.slice(0, 1) : "T";

    const handleClose = async (action) => {
        setAnchorEl(null);
        if (action === 'logout') {
            await AuthService.logout("");
            clear();
            window.location.href = ROUTES.LOGIN;
        }
    };

    if (!showHeader) {
        return null;
    }

    return (
        <AppBar position="fixed" elevation={0} sx={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)', zIndex: 1 }} >
            <Toolbar sx={{ justifyContent: 'flex-end' }}>
                <Box sx={{ display: "flex", height: "37px" }}>
                    
                    <Box sx={{ position: "relative" }}>
                        <MuiButton
                            // startIcon={<img src={ProfileIcon} sx={{ bgcolor: '#1976d2', width: 25, height: 25 }} />}
                            text={userName.toUpperCase()}
                            // handleOnClick={handleMenu}
                            className="user-name-btn"
                        />
                    </Box>
                </Box>
            </Toolbar>
        </AppBar >
    );
};

export default TopHeader;

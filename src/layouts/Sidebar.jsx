import React from "react";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import { ROUTES } from "../constants/constant";

// --- 1. Import Your Logos & Icons ---
import Logo from "../assets/vervali_logo.svg";
import FooterLogo from "../assets/vervali_logo.svg";
import DashboardIconSvg from "../assets/icons/dashboardd.svg";
import MetricsIconSvg from "../assets/icons/call_icon.svg";
import MicIconSvg from "../assets/icons/voice_icon.svg";
import LogoutIconSvg from "../assets/icons/logout_icon.svg";

// --- 2. Sidebar Menu Items ---
const sidebarItems = [
  {
    text: "Dashboard",
    icon: DashboardIconSvg,
    path: ROUTES.DASHBOARD,
  },
  {
    text: "Call Metrics",
    icon: MetricsIconSvg,
    path: ROUTES.CALL_METRICS,
  },
  {
    text: "AI Voice Agent",
    icon: MicIconSvg,
    path: ROUTES.AI_VOICE_AGENT,
  },
];

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("Logging out...");
    navigate(ROUTES.LOGIN);
  };

  const inactiveColor = "#1F2C5E";

  const navLinkStyle = ({ isActive }) => ({
    textDecoration: "none",
    display: "block",
    color: isActive ? "#FFFFFF" : inactiveColor,
  });

  const listItemStyle = (isActive) => ({
    margin: "8px 16px",
    width: "auto",
    borderRadius: "10px",
    backgroundColor: isActive ? "#1B9ED9" : "transparent",
    "&:hover": {
      backgroundColor: isActive ? "#1B9ED9" : "rgba(31, 44, 94, 0.05)",
    },
    "& .MuiListItemText-primary": {
      fontWeight: 500,
    },
  });

  return (
    <Box
      sx={{
        width: 250,
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#FFFFFF",
        borderRight: "1px solid rgba(0, 0, 0, 0.05)",
        boxShadow: "4px 0px 16px rgba(0, 0, 0, 0.08)",
        boxSizing: "border-box",
        borderTopRightRadius: "16px",
        borderBottomRightRadius: "16px",
        position: "relative",
        zIndex: 1200,
      }}
    >
      {/* --- Logo (Top) --- */}
      <Box
        sx={{
          p: 3,
          mb: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img src={Logo} alt="Vervali" style={{ height: "40px" }} />
      </Box>

      {/* --- Navigation Links & Logout --- */}
      <List sx={{ pt: 2 }}>
        
        {/* 1. Loop through Menu Items */}
        {sidebarItems.map((item) => (
          <NavLink
            to={item.path}
            key={item.text}
            style={navLinkStyle}
          >
            {({ isActive }) => (
              <ListItem disablePadding sx={listItemStyle(isActive)}>
                <ListItemButton
                  sx={{ borderRadius: "10px", padding: "8px 16px" }}
                >
                  <ListItemIcon sx={{ minWidth: "40px" }}>
                    <img
                      src={item.icon}
                      alt={item.text}
                      style={{
                        width: 20,
                        height: 20,
                        filter: isActive
                          ? "brightness(0) invert(1)"
                          : "none",
                      }}
                    />
                  </ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            )}
          </NavLink>
        ))}

        {/* 2. Logout Button (Placed directly in List to match alignment) */}
        <ListItem
          disablePadding
          sx={listItemStyle(false)} // Reusing the exact same style object
          onClick={handleLogout}
        >
          <ListItemButton
            sx={{
              borderRadius: "10px",
              padding: "8px 16px",
              color: inactiveColor,
            }}
          >
            <ListItemIcon sx={{ minWidth: "40px" }}>
              <img
                src={LogoutIconSvg}
                alt="Logout"
                style={{ width: 20, height: 20 }}
              />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </ListItem>

      </List>

      {/* --- Powered By Footer --- */}
      <Box
        sx={{
          mt: "auto",
          textAlign: "center",
          p: 3,
          pb: 4,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: 1,
        }}
      >
        <Typography
          variant="caption"
          sx={{
            color: "rgba(102, 102, 102, 1)",
            fontSize: "16px",
            fontWeight: 400,
            whiteSpace: "nowrap",
          }}
        >
          Powered by
        </Typography>

        <img
          src={FooterLogo}
          alt="Vervali"
          style={{ height: "22px", width: "auto" }}
        />
      </Box>
    </Box>
  );
};

export default Sidebar;
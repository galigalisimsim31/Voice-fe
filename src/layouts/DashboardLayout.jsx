import React from "react";
import { Outlet } from "react-router-dom";
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Avatar,
} from "@mui/material";
// Make sure this path is correct
import Sidebar from "./Sidebar"; 
import ProfileIcon from "../assets/icons/myprofile.svg";

// --- Header Profile Icon ---
const HeaderProfile = () => {
  const user = JSON.parse(localStorage.getItem("user")) || {};

const displayName = user.fullName || "User";
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, pr: 2 }}>
      <img 
        src={ProfileIcon} 
        alt="Profile"
        style={{ width: 32, height: 32, borderRadius: "50%", objectFit: "cover" }}
      />
      <Typography variant="body1" fontWeight="600" color="text.primary">
        {displayName}
      </Typography>
    </Box>
  );
};




// --- Main Layout (NEW Grid Structure) ---
const DashboardLayout = () => {
  // Get the width from your Sidebar.js file (it's 260px)
  const sidebarWidth = 260; 

  return (
    // 1. Overall Page Wrapper
    <Box
      sx={{
        display: "grid",
        // Define 2 columns: sidebar (260px) and content (rest of the space)
        gridTemplateColumns: `${sidebarWidth}px 1fr`,
        // Define 2 rows: header (auto height) and content (rest of the space)
        gridTemplateRows: "auto 1fr",
        height: "100vh",
        backgroundColor: "#F7F7F7", // Light gray content bg
      }}
    >
      
      {/* 2. Header (AppBar) */}
      <AppBar
        position="static"
        sx={{
          // Place in Row 1, but make it span BOTH columns (behind the sidebar)
          gridColumn: "1 / 3",
          gridRow: "1 / 2",
          backgroundColor: "#FFFFFF",
          color: "text.primary",
          boxShadow: "none",
          borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
          // Sits BEHIND the sidebar
          zIndex: 5, 
        }}
      >
        <Toolbar>
          {/* This pushes the profile to the far right */}
          <Box sx={{ flexGrow: 1 }} />
          <HeaderProfile />
        </Toolbar>
      </AppBar>

      {/* 3. Sidebar */}
      <Box
        sx={{
          // Place in Col 1, and make it span BOTH rows (full height)
          gridColumn: "1 / 2",
          gridRow: "1 / 3",
          // Sits ON TOP of the header
          zIndex: 10, 
          position: "relative", // Required for z-index to work
        }}
      >
        {/* Your Sidebar.js component (with its 100vh height and border-radius) */}
        {/* will render perfectly inside this container. */}
        <Sidebar />
      </Box>

      {/* 4. Main Content Area */}
      <Box
        component="main"
        sx={{
          // Place in Col 2 and Row 2 (under header, right of sidebar)
          gridColumn: "2 / 3",
          gridRow: "2 / 3",
          pt: 3,
          pr:3, // Padding for your content
          overflow: "auto", // Add scroll for content only
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default DashboardLayout;
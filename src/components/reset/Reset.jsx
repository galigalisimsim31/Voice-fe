import React from "react";
import { Button, Box } from "@mui/material";
import RefreshIcon from "../../assets/icons/reset.svg";

const ResetButton = ({ onClick }) => {
  return (
    <Button
      variant="contained"
      // --- UPDATE: Use Box + img for the icon ---
      startIcon={
        <Box
          sx={{
            width: '16px', // Adjust size as needed
            height: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <img
            src={RefreshIcon}
            alt="reset"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              filter: 'brightness(0) invert(1)' // Optional: Makes the icon white if it isn't already
            }}
          />
        </Box>
      }
      onClick={onClick}
      sx={{
        textTransform: "none",
        borderRadius: "8px",
        height: "38px",
        width: "100px",
        fontSize: '0.875rem',
        fontWeight:"600",
        padding: '6px 12px',
        flexShrink: 0,
        backgroundColor: "rgba(27, 158, 217, 1)",
        color:"rgba(255, 255, 255, 1)",
        gap: "5px", // Adds space between icon and text
        marginLeft:"10px"
      }}
    >
      Reset
    </Button>
  );
};

export default ResetButton;
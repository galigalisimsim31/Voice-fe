import React from 'react';
import { Button, Box } from '@mui/material';
// Make sure this file path matches your actual asset name
import ExportIcon from '../../assets/icons/export.svg';

const ExportButton = ({ onClick }) => {
  return (
    <Button
      variant="outlined"
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
            src={ExportIcon}
            alt="export"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              // If your icon is black and needs to match the text color (#1F2C5E),
              // you might need a CSS filter here, otherwise it renders original colors.
            }}
          />
        </Box>
      }
      onClick={onClick}
      sx={{
        textTransform: 'none',
        borderRadius: '8px',
        height: '38px',
        width: '100px   ',
        fontSize: '0.875rem',
        fontWeight: '600',

        padding: '6px 12px',
        flexShrink: 0,
        color: 'rgba(255, 255, 255, 1)',
        backgroundColor: 'rgba(31, 44, 94, 1)',
        gap: '3px',
      }}
    >
      Export
    </Button>
  );
};

export default ExportButton;

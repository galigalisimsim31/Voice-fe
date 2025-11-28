// src/features/ConfirmationDialog/index.jsx
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogActions,
  Typography,
  Box,
  Button,
} from '@mui/material';

// You can import the default SVG here or pass it as a prop if it changes
import ConfirmationSvg from '../../assets/icons/inactive.svg';

const ConfirmationDialog = ({
  open,
  onClose,
  onConfirm,
  title,
  subTitle, // Optional: for the second line of text
  confirmText = "Yes",
  cancelText = "No",
  confirmButtonColor = "rgba(31, 44, 94, 1)", // Default Blue
  cancelButtonColor = "rgba(230, 230, 230, 1)", // Default Grey
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          borderRadius: '16px',
          padding: '16px',
          maxWidth: '400px',
          width: '100%',
          textAlign: 'center',
        },
      }}
    >
      <DialogContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontSize: '16px',
            fontWeight: 500,
            color: 'rgba(0, 0, 0, 1)',
          }}
        >
          {title}
          {subTitle && <br />}
          {subTitle}
        </Typography>
        
        <Box sx={{ my: 1 }}>
          <img
            src={ConfirmationSvg}
            alt="confirm"
            style={{ width: '140px' }}
          />
        </Box>
      </DialogContent>

      <DialogActions sx={{ justifyContent: 'center', gap: 2, pb: 2 }}>
        <Button
          onClick={onClose}
          variant="contained"
          sx={{
            backgroundColor: cancelButtonColor,
            color: 'rgba(0, 0, 0, 1)',
            textTransform: 'none',
            boxShadow: 'none',
            width: '100px',
            "&:hover": { backgroundColor: "#d1d1d1" }
          }}
        >
          {cancelText}
        </Button>
        <Button
          onClick={onConfirm}
          variant="contained"
          sx={{
            backgroundColor: confirmButtonColor,
            textTransform: 'none',
            width: '100px',
            boxShadow: 'none',
             "&:hover": { backgroundColor: confirmButtonColor } 
          }}
        >
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
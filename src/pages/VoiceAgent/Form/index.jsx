import React, { useMemo } from 'react';
import {
  Box,
  Typography,
  Drawer,
  IconButton,
  TextField,
  Button,
  Select,
  MenuItem,
  Divider,
  Switch,
  styled,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

// --- Update these paths based on your folder structure ---
// Since this file is deeper in the structure (inside /form), add an extra "../"
import DropDownIcon from '../../../assets/icons/dropdown.svg';
import ModelIcon from '../../../assets/icons/voice_icon.svg';
import TrainIcon from '../../../assets/icons/train_ai.svg';
import GenerateIcon from '../../../assets/icons/generate.svg';
import NoPromptIcon from '../../../assets/icons/search.svg';
import UploadIcon from '../../../assets/icons/upload.svg';

// --- STABLE COMPONENTS AND STYLED DEFINITIONS (Defined outside the main component) ---

// 1. Custom Styled Switch (Optimized)
const GreenSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 38,
  height: 22,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(16px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: '#00C853',
        opacity: 1,
        border: 0,
      },
      // Removed redundant disabled styling inside checked
    },
    // Combined focusVisible/disabled into simpler structure
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: '#33cf4d',
      border: '6px solid #fff',
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color: theme.palette.grey[100],
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: 0.7,
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 18,
    height: 18,
  },
  '& .MuiSwitch-track': {
    borderRadius: 26 / 2,
    backgroundColor: '#E9E9EA',
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500,
    }),
  },
}));

// 2. Custom Form Label (Optimized - extracted from render)
const FormLabel = React.memo(({ children, required }) => (
  <Typography
    variant="subtitle2"
    sx={{
      fontWeight: 600,
      mb: 0.5,
      fontSize: '13px',
      color: 'rgba(0, 0, 0, 1)',
    }}
  >
    {children} {required && <span style={{ color: 'red' }}>*</span>}
  </Typography>
));
FormLabel.displayName = 'FormLabel';

// 3. Custom Select Icon (Optimized - extracted from render)
const CustomSelectIcon = React.memo((props) => {
  return (
    <img
      src={DropDownIcon}
      alt="arrow"
      {...props}
      style={{
        width: '12px',
        height: '12px',
        marginRight: '8px',
      }}
    />
  );
});
CustomSelectIcon.displayName = 'CustomSelectIcon';


// --- The Component ---
const AddAgentForm = ({ open, onClose, onSave }) => {
  
  // Use useMemo for stable, complex style objects to avoid object re-creation on render
  const drawerPaperProps = useMemo(() => ({
    sx: {
      width: '500px',
      p: 0,
      borderTopLeftRadius: '24px',
      borderBottomLeftRadius: '24px',
      boxShadow: '-5px 0px 20px rgba(0, 0, 0, 0.25)',
      overflow: 'hidden',
    },
  }), []);

  const commonTextFieldSx = useMemo(() => ({
    backgroundColor: 'rgba(238, 238, 238, 1)',
    borderRadius: 2,
    '& fieldset': { border: 'none' },
  }), []);

  const headerSx = useMemo(() => ({
    p: 2,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(238, 240, 245, 1)',
  }), []);

  const contentSx = useMemo(() => ({
    p: 3,
    flexGrow: 1,
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: 3,
  }), []);
  
  const generateButtonSx = useMemo(() => ({
    backgroundColor: '#00A3E0',
    textTransform: 'none',
    color: 'white',
    fontWeight: 'bold',
    boxShadow: 'none',
  }), []);
  
  const backButtonSx = useMemo(() => ({
    backgroundColor: 'rgba(230, 230, 230, 1)',
    color: 'rgba(0, 0, 0, 1)',
    textTransform: 'none',
    width: '100px',
    borderRadius: '2',
  }), []);

  const saveButtonSx = useMemo(() => ({
    backgroundColor: 'rgba(31, 44, 94, 1)',
    textTransform: 'none',
    width: '100px',
    color: 'rgba(255, 255, 255, 1)',
    borderRadius: '2',
  }), []);


  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      BackdropProps={{ invisible: true }}
      PaperProps={drawerPaperProps} // Use memoized props
    >
      {/* Header */}
      <Box sx={headerSx}>
        <Typography variant="h6" sx={{ color: 'rgba(0, 0, 0, 1)' }}>
          V - 1234
        </Typography>
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </Box>

      {/* Scrollable Content */}
      <Box sx={contentSx}>
        
        {/* Section 1: Model */}
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2, color: 'rgba(0, 0, 0, 1)' }}>
            <img src={ModelIcon} alt="model" style={{ width: 20, height: 20 }} />
            <Typography fontWeight="400">Model</Typography>
          </Box>
          <Divider sx={{ mb: 2 }} />

          <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
            <Box sx={{ flex: 1 }}>
              <FormLabel required>Name</FormLabel>
              <TextField
                fullWidth
                size="small"
                placeholder="Neha"
                // Re-use common style object
                sx={commonTextFieldSx}
              />
            </Box>
            <Box sx={{ flex: 1 }}>
              <FormLabel required>Voice</FormLabel>
              <Select
                fullWidth
                size="small"
                displayEmpty
                defaultValue=""
                IconComponent={CustomSelectIcon}
                sx={{
                  ...commonTextFieldSx, // Re-use common style object
                  '& .MuiSelect-icon': { top: 'calc(50% - 6px)' }, // Add specific style
                }}
              >
                {/* Setting an initial value for displayEmpty is necessary for rendering "Elliot" as placeholder */}
                <MenuItem value="" disabled>Elliot</MenuItem>
                <MenuItem value="Elliot">Elliot</MenuItem>
                <MenuItem value="Cope">Cope</MenuItem>
              </Select>
            </Box>
          </Box>

          <Box>
            <FormLabel>Status</FormLabel>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="caption" color="text.secondary">
                Is Active?
              </Typography>
              <GreenSwitch defaultChecked />
            </Box>
          </Box>
        </Box>

        {/* Section 2: Train AI */}
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <img src={TrainIcon} alt="train" style={{ width: 20, height: 20 }} />
            <Typography fontWeight="600">Train Your AI Agent</Typography>
          </Box>
          <Divider sx={{ mb: 2 }} />

          <Box sx={{ mb: 2 }}>
            <FormLabel>Create Prompt</FormLabel>
            <TextField
              fullWidth
              size="small"
              placeholder="Describe what you'd like in prompt"
              sx={{
                ...commonTextFieldSx, // Re-use common style object
                mb: 1, // Add specific margin
              }}
            />
            <Button
              fullWidth
              variant="contained"
              startIcon={<img src={GenerateIcon} alt="generate" style={{ width: 18, height: 18 }} />}
              sx={generateButtonSx} // Use memoized style
            >
              Generate
            </Button>
          </Box>

          <Box sx={{ mb: 2 }}>
            <FormLabel>System Prompt</FormLabel>
            <Box
              sx={{
                height: 180,
                border: '2px dashed rgba(69, 69, 69, 0.6)', // Moved border here from KB section
                ...commonTextFieldSx, // Re-use background/border-radius
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography variant="body2" sx={{ mb: 1, color: 'rgba(69, 69, 69, 1)', fontWeight: 600 }}>
                No Prompt Available
              </Typography>
              <img src={NoPromptIcon} alt="no prompt" style={{ width: 60, height: 60 }} />
              <Typography variant="caption" sx={{ mt: 1, color: 'rgba(69, 69, 69, 1)', fontWeight: 400 }}>
                Create a prompt to generate an AI Agent.
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Section 3: Knowledge Base */}
        <Box>
          <Box
            sx={{
              border: '2px dashed rgba(69, 69, 69, 0.6)',
              borderRadius: 2,
              p: 3,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(238, 238, 238, 1)',
            }}
          >
            <img src={UploadIcon} alt="upload" style={{ width: 30, height: 30, marginBottom: 8 }} />
            <Typography variant="subtitle2" fontWeight="bold" color="rgba(0, 0, 0, 1)">
              Upload Company Knowledge Base
            </Typography>
            <Typography variant="caption" color="rgba(69, 69, 69, 1)" display="block">
              Upload your details file to train or refine the AI assistant.
            </Typography>
            <Typography variant="caption" color="rgba(69, 69, 69, 1)">
              Supported formats: .TXT
            </Typography>
          </Box>
        </Box>

        {/* Section 4: Output Language */}
        <Box>
          <FormLabel required>Transcript Output Language</FormLabel>
          <TextField
            fullWidth
            size="small"
            placeholder="English"
            sx={{
              ...commonTextFieldSx, // Re-use common style object
              '& .MuiInputBase-input': { color: 'rgba(0, 0, 0, 1)' },
            }}
          />
        </Box>
      </Box>

      {/* Footer Actions */}
      <Box sx={{ p: 3, display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
        <Button
          onClick={onClose}
          sx={backButtonSx} // Use memoized style
        >
          Back
        </Button>
        <Button
          variant="contained"
          onClick={onSave}
          sx={saveButtonSx} // Use memoized style
        >
          Save
        </Button>
      </Box>
    </Drawer>
  );
};

export default AddAgentForm;
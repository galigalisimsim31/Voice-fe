import React from 'react';
import { FormControl, MenuItem, Select, Typography, IconButton, Box, FormHelperText } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
const ClearableSelect = ({
  label,
  value = "",
  onClear,
  options,
  placeholder = 'Please Select',
  name = '',
  error,
  helperText = "",
  isRequired = false,
  ...rest
}) => {

  return (
    <FormControl fullWidth sx={{ mt: 0 }} error={!!error}>
      {label && (
        <Typography fontWeight="bold" mb={1} className='form-label' variant="subtitle2" gutterBottom>{label} {isRequired && <span className='error'>*</span>}</Typography>
      )}
      <Select value={value} displayEmpty name={name} size="small"
        error={!!error}
        IconComponent={() =>
          value ? (
            <IconButton onClick={onClear} size="small" sx={{ color: 'red', mr: 1 }} >
              <ClearIcon fontSize="small" />
            </IconButton>
          ) : null
        }
        sx={{
          '& .MuiSelect-select': {
            display: 'flex',
            alignItems: 'center',
          },
          backgroundColor: '#F3F5F9',
        }}
        {...rest}
      >
        <MenuItem value="" disabled>
          <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            {placeholder}
            <ExpandMoreIcon sx={{ fontSize: 16 }} />
          </Box>
        </MenuItem>
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      {error && (
        <Typography variant="caption" color="error" mt={1} display="block">
          {helperText}
        </Typography>
      )}
    </FormControl>
  );
};

export default ClearableSelect;

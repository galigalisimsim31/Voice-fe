import styles from "./index.module.css";
import { Autocomplete, Box, TextField, Typography } from "@mui/material";
import PropTypes from 'prop-types';

const MuiAutoComplete = (props) => {
  const {
    label = "Select",
    className = "",
    handleChange = () => { },
    selected = null,
    itemsList = [],
    id = "autocomplete-label",
    size = "small",
    fullWidth = true,
    style = {},
    error = false,
    helperText = "",
    isRequired = false,
    placeholder = "Select"
  } = props;


  return (
    <>
      <Typography className='form-label' variant="subtitle2" gutterBottom>
        <Box>{label}</Box> {isRequired && <span className='error'>*</span>}
      </Typography>
      <Autocomplete
        id={id}
        options={itemsList}
        getOptionLabel={(option) => option.label}
        value={itemsList.find(item => item.value === selected) || null}
        onChange={(_, newValue) => handleChange(newValue ? newValue.value : "")}
        size={size}
        fullWidth={fullWidth}
        className={`${styles?.autocomplete_outer} ${className}`}
        sx={style}
        slotProps={{
          paper: {
            sx: {
              bgcolor: 'var(--main-bg-color)',           // dropdown container bg
              border: '1px solid rgba(0,0,0,0.25)',
              color: 'var(--text-color)',
            },
          },
          listbox: {
            sx: {
              bgcolor: 'var(--main-bg-color)',     // list background
              '& .MuiAutocomplete-option': {
                bgcolor: 'transparent',
                color: 'var(--text-color)',
              },
              '& .MuiAutocomplete-option[aria-selected="true"]': {
                bgcolor: 'var(--main-bg-color)',   // selected
              },
              '& .MuiAutocomplete-option.Mui-focused': {
                bgcolor: 'rgba(96,49,254,0.25)',   // hover/focused
              },
              '& .MuiAutocomplete-noOptions': {
                bgcolor: 'var(--main-bg-color)',
                color: 'var(--text-color)',
              },
              // (optional) style "Loading…" row too
              '& .MuiAutocomplete-loading': {
                bgcolor: 'var(--main-bg-color)',
                color: 'var(--text-color)',
              },
            },
          },
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            // label={label}
            variant="outlined"
            size={size}
            placeholder={placeholder}
          />
        )}
      />
      {
        error && (
          <Typography color="error" variant="caption">
            {helperText}
          </Typography>
        )
      }
    </>
  );
};

MuiAutoComplete.propTypes = {
  label: PropTypes.string, // Label text for the Select component
  className: PropTypes.string, // Additional class names for styling
  handleChange: PropTypes.func.isRequired, // Function to handle selection changes
  selected: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), // Currently selected value
  itemsList: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired, // Label text for the dropdown item
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired, // Value for the dropdown item
    })
  ).isRequired, // List of dropdown items
  id: PropTypes.string, // ID for accessibility and matching the InputLabel
  size: PropTypes.oneOf(["small", "medium"]), // Size of the Select component
  fullWidth: PropTypes.bool, // Whether the Select component spans full width
};

export default MuiAutoComplete;

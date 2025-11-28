import * as React from 'react';
import PropTypes from 'prop-types';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { forwardRef } from "react";
import styles from "./index.module.css";
import { Box, Typography } from '@mui/material';
import CheckIcon from "@mui/icons-material/Check";

const UncheckedIcon = () => (
  <Box
    sx={{
      width: 16,
      height: 16,
      borderRadius: "50%",
      backgroundColor: "var(--text-color)", // page bg
    }}
  />
);

const CheckedIcon = () => (
  <Box
    sx={{
      width: 16,
      height: 16,
      borderRadius: "50%",
      backgroundColor: "var(--simulation-active-chip-bg)", // your green
      display: "grid",
      placeItems: "center",
    }}
  >
    <CheckIcon sx={{ fontSize: 16, color: "#fff", lineHeight: 1 }} />
  </Box>
);

const MuiRadioGroup = forwardRef((props, ref) => {
  const {
    label = "",
    value = "",
    onChange = () => { },
    options = [],
    isdDisabled = false,
    className = "",
    minHeight = "28px",
    isRequired = false,
  } = props;

  return (
    <FormControl ref={ref}>
      {label && <Typography className='form-label' variant="subtitle2" gutterBottom>
        {label} {isRequired && <span className='error'>*</span>}
      </Typography>}
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        value={value}
        onChange={onChange}
        className={`${styles.radioGroup} ${className}`}
      >
        {options.map((item, index) => (
          <FormControlLabel
            key={index}
            value={item?.value}
            control={
              <Radio
                icon={<UncheckedIcon />}
                checkedIcon={<CheckedIcon />}
                sx={{
                  color: "var(--text-color)",
                  "&.Mui-checked": { color: "var(--simulation-active-chip-bg)" },
                  "&.Mui-unchecked": { color: "var(--text-color)" } // your color
                }}
              />
            }
            label={item?.label}
            disabled={isdDisabled || item?.isdDisabled}
            sx={{ color: "var(--text-color)" }}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
});

MuiRadioGroup.propTypes = {
  label: PropTypes.string, // Label for the group
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]), // Selected value
  onChange: PropTypes.func, // Change handler
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
      ]).isRequired,
      label: PropTypes.string.isRequired,
      isdDisabled: PropTypes.bool
    })
  ), // Options array
  isdDisabled: PropTypes.bool // Disable all options
};

export default MuiRadioGroup;

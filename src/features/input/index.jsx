

import { TextField, Typography, Box } from "@mui/material"; // Box is already here
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import PropTypes from "prop-types";
import { forwardRef } from "react";
import styles from "./index.module.css";

const MuiInput = forwardRef((props, ref) => {
  const {
    label,
    size = "small",
    placeholder = "input here",
    variant = "outlined",
    disabled,
    rows,
    multiline = false,
    fieldId,
    style,
    className = "",
    type = "text",
    startIcon = null,
    endIcon = null,
    handleEndIconClick = () => {},
    helperText = "",
    error = false,
    onChange,
    onFocus,
    value,
    fullWidth = true,
    isRequired = false,
    outerClass = "",
    showButton = false,
    onBlur = () => {},
    
    sx, 
    
    ...rest 
  } = props;

  return (
    <Box className={outerClass} sx={sx}>
      {label && (
        <Typography className="form-label" variant="subtitle2" gutterBottom>
          <Box component="span">{label}</Box>{" "} 
          {isRequired && <span className="error">*</span>}
        </Typography>
      )}
      <Box className={styles?.input_container} gap={1}>
        <TextField
          ref={ref}
          type={type}
          multiline={multiline}
          placeholder={placeholder}
          className={`${styles?.input_boc} ${className}`}
          id={fieldId}
          value={value}
          size={size}
          fullWidth={fullWidth}
          style={style}
          disabled={disabled}
          onFocus={onFocus}
          onBlur={onBlur}
          error={error}
          variant={variant}
          autoComplete="new-password"
          rows={rows}
          helperText={helperText}
          onChange={(e) => {
            const newValue = e.target.value.replace(/\s{2,}/g, " ");
            if (newValue === " ") return;
            onChange?.({ ...e, target: { ...e.target, value: newValue } });
          }}
          onKeyDown={(e) => {
            if (type === "number") {
              const blockedKeys = ["e", "E", "-", "+", "."];
              if (blockedKeys.includes(e.key)) {
                e.preventDefault();
              }
            }
          }}
          InputProps={{
            startAdornment: startIcon && (
              <InputAdornment position="start">{startIcon}</InputAdornment>
            ),
            endAdornment: endIcon && (
              <InputAdornment position="end">
                {handleEndIconClick ? (
                <IconButton onClick={handleEndIconClick} edge="end">
                  {endIcon}
                </IconButton>
              ) : (
                endIcon
              )}
              </InputAdornment>
            ),
          }}
          inputProps={
            type === "number"
              ? { ...(rest?.inputProps || {}), min: rest?.inputProps?.min ?? 0 }
              : rest?.inputProps || undefined
          }
          sx={{
            // This internal sx is fine, it only styles the TextField
            "& input[type=number]::-webkit-inner-spin-button": {
              WebkitAppearance: "none",
              margin: 0,
            },
            "& input[type=number]::-webkit-outer-spin-button": {
              WebkitAppearance: "none",
              margin: 0,
            },
            "& input[type=number]": {
              MozAppearance: "textfield",
            },
            "& input[type='password']::-ms-reveal": { display: "none" },
            "& input[type='password']::-ms-clear": { display: "none" },
            background: "#fff", // This is redundant but okay
          }}
          {...rest} // --- FIX 3: Pass rest (which no longer has sx)
        />
        {showButton && (
          <Box className={styles?.buttonContainer}>
            {props.btnHtml}
          </Box>
        )}
      </Box>
    </Box>
  );
});

// ... (PropTypes remain the same) ...
MuiInput.propTypes = {
  label: PropTypes.string,
  onFocus: PropTypes.func,
  value: PropTypes.string,
  size: PropTypes.oneOf(["small", "medium"]),
  placeholder: PropTypes.string,
  variant: PropTypes.oneOf(["outlined", "filled", "standard"]),
  disabled: PropTypes.bool,
  rows: PropTypes.number,
  multiline: PropTypes.bool,
  fieldId: PropTypes.string,
  style: PropTypes.object,
  className: PropTypes.string,
  type: PropTypes.string,
  endIcon: PropTypes.node,
  handleEndIconClick: PropTypes.func,
  helperText: PropTypes.string,
  error: PropTypes.bool,
  onChange: PropTypes.func.isRequired, // from react-hook-form
};

export default MuiInput;
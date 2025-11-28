import { Button, Tooltip } from "@mui/material";
import { BUTTON_LABEL } from '../../constants/constant';
import PropTypes from 'prop-types';
import styles from "./index.module.css";

const MuiButton = (props) => {
  const {
    text = BUTTON_LABEL.SUBMIT,
    className = "",
    startIcon = null,
    endIcon = null,
    handleOnClick = () => { },
    variant = "contained",
    size = "small",
    fullWidth = false,
    isDisabled = false,
    title = "",
    type = "button",

    // --- 1. FIX: Destructure sx from props ---
    sx,

    // Destructure any other props
    ...rest
  } = props;

  const onClick = (e) => {
    console.log("call submit")
    handleOnClick(e);
  }

  return (
    <Tooltip title={title} arrow disableHoverListener={!title}>
      <Button
        variant={variant}
        size={size}
        className={`${styles?.mui_custom_btn} ${className} ${!text ? styles.iconOnlyBtn : ""}`}
        startIcon={startIcon ? startIcon : null}
        endIcon={endIcon ? endIcon : null}
        fullWidth={fullWidth}
        onClick={onClick}
        disabled={isDisabled}
        type={type}
        
        // --- 2. FIX: Apply the sx prop here ---
        sx={{
          textTransform: 'none', // Your existing style
          ...sx // This spreads all the styles from LoginPage.js
        }}
        
        // --- 3. FIX: Pass the rest of the props ---
        {...rest}
      >
        {text}
      </Button>
    </Tooltip>
  );
};

MuiButton.propTypes = {
  text: PropTypes.string, // The label text for the button
  className: PropTypes.string, // Additional CSS classes for the button
  startIcon: PropTypes.node, // Icon component to display at the start of the button
  endIcon: PropTypes.node, // Icon component to display at the end of the button
  handleOnClick: PropTypes.func, // Callback function for button click
  variant: PropTypes.oneOf(['text', 'outlined', 'contained']), // Material-UI button variants
  size: PropTypes.oneOf(['small', 'medium', 'large']), // Material-UI button sizes
  fullWidth: PropTypes.bool, // Boolean to make the button full width
  isDisabled: PropTypes.bool, // Boolean to disable the button
  title: PropTypes.string, // Tooltip text
  type: PropTypes.string, // Button type
  sx: PropTypes.object, // <-- Add sx to propTypes
  // Note: Your other propTypes (isFlashing, etc.) are missing from
  // the destructuring but I've left them in the propTypes.
  isFlashing: PropTypes.bool,
  allowAutoSubmitFlashing: PropTypes.bool,
  progressClassName: PropTypes.string,
  flashingClassName: PropTypes.string,
  isHintButton: PropTypes.bool,
  flashingText: PropTypes.string,
};

// Add defaultProp for sx
MuiButton.defaultProps = {
  sx: {},
};

export default MuiButton;
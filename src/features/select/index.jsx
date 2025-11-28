import styles from "./index.module.css";
import { Select, FormControl, InputLabel, MenuItem, Typography, Box } from "@mui/material";
import PropTypes from 'prop-types';

const MuiSelect = (props) => {
  const {
    label = "Select",
    placeholder = "Select an option",
    className = "",
    handleChange = () => { },
    selected = "",
    itemsList = [],
    id = "simple-select-label",
    size = "small",
    fullWidth = true,
    style = {},
    helperText = "",
    error = false,
    isRequired = false
  } = props;

  return (
    <FormControl fullWidth={fullWidth} size={size} className={`${styles?.select_outer} ${className}`}>
      <Typography className='form-label' variant="subtitle2" gutterBottom>
        <Box>{label}</Box> {isRequired && <span className='error'>*</span>}
      </Typography>
      <Select
        placeholder={placeholder}
        className="passage-selected-item"
        id={id}
        value={selected}
        error={error}
        helperText={helperText}
        onChange={(event) => {
          handleChange(event)
        }}
        displayEmpty
        renderValue={(val) =>
          val === "" ? (
            <span style={{ color: "#40403d" }}>{placeholder}</span>
          ) : (
            // show the label for the selected value
            itemsList.find((it) => it.value === val)?.label ?? ""
          )
        }
        MenuProps={{
          PaperProps: {
            sx: {
              background: 'var(--main-bg-color)',
              border: '1px solid rgba(0,0,0,0.25)',
              '& .MuiMenuItem-root': { color: 'var(--text-color)' },
            }
          }
        }}
        sx={{
          ...style,
          // the arrow color
          '& .MuiSvgIcon-root': { color: 'var(--text-color)' },   // works for most cases
          '& .MuiSelect-icon': { color: 'var(--text-color)' },    // extra safety
        }}
      >
        <MenuItem className="passage-selection" key={"-1"} value={""} disabled>{placeholder}</MenuItem>
        {itemsList?.map((item, index) => {
          return <MenuItem className="passage-selection" key={index} value={item?.value}>{item?.label}</MenuItem>;
        })}
      </Select>
      {
        error && (
          <Typography color="error" variant="caption">
            {helperText}
          </Typography>
        )
      }
    </FormControl>
  );
};

MuiSelect.propTypes = {
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

export default MuiSelect;

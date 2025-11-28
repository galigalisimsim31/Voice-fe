import React from "react";
import { Select, MenuItem, Typography, styled } from "@mui/material";

// --- 1. Import your custom Icon ---
// Adjust path if necessary
import DropDownIcon from "../../assets/icons/dropdown.svg"; 

// --- 2. Create a Wrapper Component for the Icon ---
const CustomSelectIcon = (props) => {
  return (
    <img
      src={DropDownIcon}
      alt="arrow"
      {...props} // IMPORTANT: Passes the className from MUI that handles rotation
      style={{ 
        width: "10px", 
        height: "10px",
        marginRight: "3px", 
      }}
    />
  );
};

// Styled component for Select
const StyledSelect = styled(Select)(({ theme }) => ({
  backgroundColor: "rgba(246, 247, 247, 1)",
  borderRadius: "8px",
  border: "1px solid rgba(209, 213, 219, 1)",
  height: "38px",
  width: "100%",
  "& .MuiOutlinedInput-notchedOutline": { border: "none" },
  "& .MuiSelect-select": { 
    padding: "8px 12px", 
    fontSize: "0.875rem" 
  },
  // Optional: Center the icon vertically
  "& .MuiSelect-icon": {
    top: "calc(50% - 6px)" 
  }
}));

const AgentSelect = ({ selectedAgent, onAgentChange, agents = [] }) => {
  return (
    <StyledSelect 
      value={selectedAgent}
      onChange={onAgentChange}
      displayEmpty
      // --- 3. Use the custom icon component ---
      IconComponent={CustomSelectIcon}
    >
      <MenuItem value="">
        <Typography variant="body2"  sx={{fontSize: '0.875rem', color:'rgba(69, 69, 69, 1)', fontWeight:"400"}}>
          --Select AI Agent--
        </Typography>
      </MenuItem>
      {agents.map((agent) => (
         <MenuItem key={agent} value={agent} sx={{fontSize: '0.875rem'}}>
          {agent}
        </MenuItem>
      ))}
    </StyledSelect>
  );
};

export default AgentSelect;
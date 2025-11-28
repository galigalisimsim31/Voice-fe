import React from "react";
import { Box, InputBase, styled } from "@mui/material";

// --- 1. Import your custom Search SVG ---
import SearchIconSvg from "../../assets/icons/searchbar.svg"; 

// Styled component specific to Search
const FilterInput = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  backgroundColor: "#FFFFFF",
  borderRadius: "8px",
  padding: "4px 12px",
  border: "1px solid rgba(209, 213, 219, 1)",
  height: "38px",
  boxSizing: 'border-box',
  width: "100%",
}));

const SearchFilter = ({ searchTerm, onSearchChange }) => {
  return (
    <FilterInput>
      <img 
        src={SearchIconSvg} 
        alt="Search" 
        style={{ 
          width: "20px", 
          height: "20px", 
          marginRight: "8px", 
        }} 
      />
      
      <InputBase 
        placeholder="Search" 
        sx={{ 
          fontSize: '0.875rem', 
          width: '100%', 
          fontWeight: "400",
          
          // 1. Applies color to the text the user TYPES
          color: "rgba(102, 102, 102, 1)", 
          
          // 2. Applies color to the PLACEHOLDER text ("Search")
          "& .MuiInputBase-input::placeholder": {
             color: "rgba(102, 102, 102, 1)",
             opacity: 1, // REQUIRED: Overrides browser default transparency
          }
        }} 
        value={searchTerm}
        onChange={onSearchChange}
      />
    </FilterInput>
  );
};

export default SearchFilter;
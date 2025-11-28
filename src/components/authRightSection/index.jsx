import styles from "./index.module.css";
import { Box, Typography } from "@mui/material";

// This is the V-shaped logo from the top-right corner in your screenshot.
// You should replace this with the path to your actual logo.

const AuthRightSection = () => {
  return (
    // This Box now has position: relative to position the logo
    <Box className={styles.right_section_outer}>
      
    

      {/* This Box holds the text overlay at the bottom */}
      <Box className={styles.right_section_text}>
        
      </Box>
    </Box>
  );
};

export default AuthRightSection;
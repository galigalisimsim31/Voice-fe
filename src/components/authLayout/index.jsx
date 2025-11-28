import { Box, Grid } from "@mui/material";
import AuthRightSection from "../authRightSection";
import FormBg from "../../assets/images/voice_bg.jpg"; 

export default function AuthLayout({ children }) {
  return (
    <Grid 
      container 
      disableGutters 
      sx={{ 
        minHeight: "100vh", 
        width: "100vw", 
        margin: 0,
        padding: 0,
        overflow: "hidden" 
      }}
    >
      
      <Grid
        size={{ xs: 12, md: 6 }}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#F7F7F7",
          backgroundImage: `url(${FormBg})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          height: "100vh", 
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: "450px", 
            px: 4, 
          }}
        >
          {children}
        </Box>
      </Grid>

      <Grid
        size={{ xs: 12, md: 6 }}
        sx={{
          display: { xs: "none", md: "block" }, 
          height: "100vh", 
          padding: 0,
        }}
      >
        <AuthRightSection />
      </Grid>

    </Grid>
  );
}
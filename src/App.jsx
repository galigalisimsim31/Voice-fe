import AppRouter from "./router";
import { Toaster } from 'react-hot-toast';
import './App.css'
import { LoaderProvider } from "./contexts/LoaderContext";
import Loader from "./features/loader";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useTheme } from "./hooks/useTheme";
import { ThemeProvider } from '@mui/material/styles';
import muiTheme from "./hooks/muiTheme";

const toastOptions = {
  style: {
    paddingLeft: "10px",
    paddingRight: "10px",
    borderRadius: "12px",
    justifyContent: "center",
    alignItems: "center",
    color: "#fff",
  },
  error: {
    style: {
      background: "linear-gradient(90deg, rgba(255, 99, 71, 0.6) 0%, #FF4756 57%, rgba(255, 99, 71, 0.6) 100%)",
    },
  },
  success: {
    style: {
      background: "linear-gradient(90deg, rgba(8, 129, 59, 0.63) 0%, #08813B 57%, rgba(8, 129, 59, 0.63) 100%)",
    },
  },
}

function App() {
  useTheme();

  return (
    <ThemeProvider theme={muiTheme}>
      <LoaderProvider>
        <Loader />
        <Toaster position="bottom-right" toastOptions={toastOptions} />
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <AppRouter />
        </LocalizationProvider>
      </LoaderProvider>
    </ThemeProvider>
  );
}

export default App;

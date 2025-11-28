import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";
import { useLoader } from "../../contexts/LoaderContext";

const Loader = () => {
    const { loading } = useLoader();

    return (
        <Backdrop open={loading} sx={{ zIndex: 99999, color: "#fff" }}>
            <CircularProgress color="inherit" />
        </Backdrop>
    );
};

export default Loader;

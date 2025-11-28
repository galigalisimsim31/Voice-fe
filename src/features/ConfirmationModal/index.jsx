import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import PropTypes from 'prop-types';
import MuiButton from "../button";
import MuiInput from "../input";
import FileCopyOutlinedIcon from '@mui/icons-material/FileCopyOutlined'; // Use @mui/icons-material for MUI v5+
import { useState } from "react";
import toast from "react-hot-toast";
import { Box } from "@mui/material";
import OtpInput from "../OtpInput";

const ConfirmationModal = (props) => {
  const { handleCancel,
    handleOk, data, CancelBtn = "Cancel",
    SubmitBtn = "Ok", isDisabled = false,
    isIdBasedConfirmation = false, inputLabel = "",
    showOTPInput = false, onChangeCode = () => { }
  } = props;

  const [value, setValue] = useState("");

  const handleSubmit = async () => {
    handleOk();
  }

  const onChange = (e) => {
    setValue(e.target.value);
  }

  return (
    <Dialog
      sx={{ "& .MuiDialog-paper": { borderRadius: 4, background: "var(--bg-color)", color: "var(--text-color)", py: 3 } }}
      maxWidth="xs"
      open={data.show}
      className="confirmation_modal"
    >
      {data?.title && <DialogTitle sx={{ textAlign: "center" }}>{data?.title}</DialogTitle>}
      <DialogContent sx={{ py: 2 }}>
        {data?.alert && <DialogContentText sx={{ textAlign: "center", color: "var(--text-color)", mt: 1, p: 1, background: `linear-gradient(90deg, rgba(8.18, 129.20, 58.61, 0) 0%, ${data?.color || "transparent"} 57%, rgba(8.18, 129.20, 58.61, 0) 100%)` }}>{data?.alert}</DialogContentText>}
        {data?.message && <DialogContentText sx={{ textAlign: "center", color: data?.color || "var(--text-color)", mt: 1 }}>{data?.message}</DialogContentText>}
        {data?.id && isIdBasedConfirmation &&
          <>
            <DialogContentText
              sx={{
                textAlign: "center",
                color: "var(--text-color)",
                background: "var(--inner-bg-dark)",
                borderRadius: 4,
                py: 0.5,
                my: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 1
              }}
            >
              {data?.id}
              <FileCopyOutlinedIcon
                sx={{ ml: 1, cursor: "pointer", fontSize: 18 }}
                onClick={() => {
                  navigator.clipboard.writeText(data?.id);
                  toast.success(`Copied to clipboard!`);
                }}
                titleAccess="Copy to clipboard"
              />
            </DialogContentText>
            <MuiInput label={inputLabel} placeholder={`Enter ${inputLabel}`} value={value} onChange={onChange} />
          </>
        }

        {showOTPInput &&
          <Box sx={{ my: 2 }}>
            <OtpInput length={6} label={inputLabel} onComplete={onChangeCode} />
          </Box>
        }
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center" }}>
        <MuiButton text={CancelBtn} className={"cancel_btn"} handleOnClick={handleCancel} isDisabled={isDisabled} />
        <MuiButton text={SubmitBtn} className={"save_btn"} handleOnClick={handleSubmit} isDisabled={isDisabled || (isIdBasedConfirmation && value != data?.id)} />
      </DialogActions>
    </Dialog>
  );
};

ConfirmationModal.propTypes = {
  handleCancel: PropTypes.func.isRequired, // Callback for the Cancel button
  handleOk: PropTypes.func.isRequired, // Callback for the Ok button
  data: PropTypes.shape({
    show: PropTypes.bool.isRequired, // Controls whether the modal is visible
    title: PropTypes.string, // Title text for the modal
    message: PropTypes.string, // Message text for the modal content
  }).isRequired, // Data object is required
};

export default ConfirmationModal;

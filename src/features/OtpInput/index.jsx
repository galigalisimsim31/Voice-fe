import { useRef, useState } from "react";
import { Box, TextField, Typography } from "@mui/material";
import styles from "./index.module.css";
import { isNumber } from "../../utils";

export default function OtpInput({ length = 6, onComplete, label = "Enter OTP", isRequired = false, type = "number" }) {
    const [otp, setOtp] = useState(Array(length).fill(""));
    const inputsRef = useRef([]);

    const handleChange = (val, index) => {
        if (val && type == "number") {
            const val1 = Number(val)
            if (!isNumber(val1)) {
                return;
            }
        }
        const updatedOtp = [...otp];
        updatedOtp[index] = val.slice(-1); // accept only last digit typed
        setOtp(updatedOtp);

        // auto move to next
        if (val && index < length - 1) {
            inputsRef.current[index + 1].focus();
        }

        if (updatedOtp.every((digit) => digit !== "")) {
            onComplete?.(updatedOtp.join(""));
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputsRef.current[index - 1].focus();
        }

        if (e.key === "ArrowLeft" && index > 0) {
            inputsRef.current[index - 1].focus();
        }

        if (e.key === "ArrowRight" && index < length - 1) {
            inputsRef.current[index + 1].focus();
        }
    };

    return (
        <>
            {label && <Typography className='form-label' variant="subtitle2" gutterBottom sx={{ ml: 2 }}>
                <Box fontWeight="bold">{label} {isRequired && <span className='error'>*</span>}</Box>
            </Typography>}
            <Box display="flex" justifyContent="center" gap={1}>
                {otp.map((digit, index) => (
                    <TextField
                        key={index}
                        type="text"
                        inputRef={(ref) => (inputsRef.current[index] = ref)}
                        value={digit}
                        onChange={(e) => handleChange(e.target.value, index)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        className={styles.otpInput}
                        inputProps={{
                            maxLength: 1,
                            style: {
                                textAlign: "center",
                                fontSize: "16px",
                                width: "15px",
                                height: "10px"
                            },
                        }}
                        placeholder={0}
                        variant="outlined"
                    />
                ))}
            </Box>
            <input
                type="text"
                name="fake-user"
                autoComplete="username"
                style={{ display: "none" }}
            />
            <input
                type="password"
                name="fake-pass"
                autoComplete="new-password"
                style={{ display: "none" }}
            />
        </>
    );
}

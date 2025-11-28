import { useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import * as yup from "yup";
import { Box, CircularProgress, Paper, Typography, Container } from "@mui/material";
import { MuiButton, MuiInput } from "../../features";
import { BUTTON_LABEL, ROUTES } from "../../constants/constant";
import { useLocalStorageUtil } from "../../utils/localStorageUtil";
import { MESSAGES } from "../../constants/messages";
import AuthService from "../../services/authService";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import AuthLayout from "../../components/authLayout";
import styles from "./index.module.css";

import EmailIcon from "../../assets/icons/email_icon.svg";
import KeyIcon from "../../assets/icons/key_icon.svg";
import UserIcon from "../../assets/icons/user_icon.svg";

const PARTNER_CODE_REGEX = /^UID-\d{8}-\d{3}$/;
import PhoneNumberField from "../../features/PhoneNumberField";
import ErrorIcon from "@mui/icons-material/Error";

const schema = yup.object().shape({
    fullName: yup
        .string()
        .required("Full name is required.")
        .min(2, "Full name must be at least 2 characters.")
        .max(100, "Full name cannot exceed 100 characters."),
    email: yup
        .string()
        .trim()
        .required("Email is required.")
        .email("Invalid email format.") // ✅ run format check first
        .test(
            "business-domain",
            "Only verified work email domains are allowed.",
            (value) => {
                if (!value) return false;
                const at = value.lastIndexOf("@");
                if (at < 0) return false;
                return true;
            }
        ),
    mobileNo: yup
        .string()
        .required("Contact number is required.")
        .matches(/^\+[1-9]\d{7,14}$/, "Enter valid phone number."),
    password: yup
        .string()
        .required("Password is required.")
        .min(8, "Password must be at least 8 characters.")
        .matches(/[a-z]/, "Password must contain at least one lowercase letter.")
        .matches(/[A-Z]/, "Password must contain at least one uppercase letter.")
        .matches(/[0-9]/, "Password must contain at least one number.")
        .matches(/[^a-zA-Z0-9]/, "Password must contain at least one special character."),
    confirmPassword: yup
        .string()
        .required("Confirm password is required.")
        .oneOf([yup.ref("password")], "Passwords do not match."),
    terms: yup
        .boolean()
        .oneOf([true], "You must accept Terms & Conditions to proceed."),
    userType: yup
        .string()
        .transform(v => (typeof v === "string" ? v.trim() : v)),
    allowPasswordReset: yup
        .boolean(),
    partnerCode: yup
        .string()
        .transform(v => (typeof v === "string" ? v.trim() : v))
        .when("userType", {
            is: (t) => String(t || "").toLowerCase() === "partner",
            then: (s) =>
                s
                    .required("Partner UID Code is required for partner user type.")
                    .matches(
                        PARTNER_CODE_REGEX,
                        "Partner UID Code must look like UID-00000000-000 (UID-8 digits-3 digits)."
                    ),
            otherwise: (s) => s.notRequired().nullable(true),
        }),
});

export default function RegisterPage() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const token = searchParams.get("token");
    const { getItem, setItem } = useLocalStorageUtil();

    const [showPassword, setShowPassword] = useState(false);
    const [alertMessage, setAlertMessage] = useState(null);

    const [validateToken, setValidateToken] = useState(token ? false : true);
    const [validateTokenError, setValidateTokenError] = useState("");

    const {
        control,
        register,
        handleSubmit,
        setValue,
        setError,
        formState: { errors },
        watch
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            fullName: "", email: "", mobileNo: "",
            password: "", confirmPassword: "", terms: false
        }
    });

    const getValidateToken = async () => {
        try {
            const res = await AuthService.validateToken(token);
            setValue("email", res?.data?.email);
            setValidateToken(true);
            setValidateTokenError("")
        } catch (error) {
            setValidateTokenError(error?.response?.data?.message || "Invalid or expired token.")
        }
    }

    useEffect(() => {
        if (token) {
            getValidateToken();
        }
    }, [])

    const onSubmit = async (data) => {
        try {
            if (token) {
                data.token = token;
            }
            await AuthService.register(data, token ? "INVITE" : "SELF");
            navigate(ROUTES.LOGIN, { state: { successMessage: { type: "SUCCESS", message: MESSAGES.LOGIN.REGISTRATION_SUCCESS } } });
        } catch (error) {
            console.log(error);
            const message = error?.response?.data?.message || 'Something went wrong.';
            setAlertMessage({
                type: "ERROR",
                message: message
            })
        }
    };

    const onBlur = async (key) => {
        try {
            const value = watch(key);

            // if empty or already has an error from yup, skip server check
            if (!value || errors?.[key]?.message) {
                return;
            }

            
        } catch (error) {
            console.error("Error determining type:", error);
        }
    }

    const {
        onBlur: rhfEmailOnBlur,
        ...emailFieldProps
    } = register("email");

    return (
        <>
            {
                !validateToken ? <Container maxWidth="sm">
                    <Paper
                        elevation={3}
                        sx={{ padding: 4, mt: 8, textAlign: "center", borderRadius: 3 }}
                    >
                        {!validateTokenError ? (
                            <>
                                <CircularProgress />
                                <Typography variant="h6" mt={2}>
                                    Verifying your email...
                                </Typography>
                            </>
                        ) : (
                            <>
                                <ErrorIcon color="error" sx={{ fontSize: 48 }} />
                                <Typography variant="h6" mt={2} color="error">
                                    {validateTokenError}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="primary"
                                    sx={{ mt: 2 }}
                                >
                                    Ask Support team to Resend Email
                                </Typography>
                            </>
                        )}
                    </Paper>
                </Container> :
                    <AuthLayout
                        title="SIGN UP"
                        description="Create Account"
                        onSubmit={handleSubmit(onSubmit)}
                        customAlert={alertMessage}
                        bottomLinks={
                            <Box display="flex" justifyContent="center" gap={2} flexDirection={{ xs: "column", sm: "row" }} textAlign="center">
                                <Typography variant="body2" sx={{ color: "var(--text-color)" }}>
                                    Already have an Account?
                                </Typography>
                                <Typography
                                    variant="body2"
                                    sx={{ color: "#6031FE", cursor: "pointer", textDecoration: "underline" }}
                                    onClick={() => navigate(ROUTES.LOGIN)}
                                >
                                    Sign In
                                </Typography>
                            </Box>
                        }
                    >
                        <MuiInput
                            label="Full Name"
                            placeholder="Enter your full name"
                            {...register("fullName")}
                            error={Boolean(errors.fullName)}
                            helperText={errors.fullName?.message}
                            isRequired
                            className={styles?.login_input}
                            startIcon={<img src={UserIcon} alt="User Icon" style={{ width: 24, height: 24 }} />}
                        />
                        <MuiInput
                            label="Business Email ID"
                            placeholder="business@example.com"
                            {...emailFieldProps}
                            error={Boolean(errors.email)}
                            helperText={errors.email?.message}
                            isRequired
                            className={styles?.login_input}
                            startIcon={<img src={EmailIcon} alt="Email Icon" style={{ width: 24, height: 24 }} />}
                            disabled={token}
                            onBlur={async (e) => {
                                // 1. Let RHF process blur (so it can clear/set required/format errors correctly)
                                rhfEmailOnBlur(e);
                                // 2. Then do async uniqueness check
                                await onBlur("email");
                            }}
                        />
                        <PhoneNumberField control={control} name="mobileNo" defaultCountry="IN" onBlur={() => {
                            onBlur("mobileNo")
                        }} />
                        <MuiInput
                            label="Password"
                            type={showPassword ? "text" : "password"}
                            placeholder="*********"
                            {...register("password")}
                            error={Boolean(errors.password)}
                            helperText={errors.password?.message}
                            isRequired
                            endIcon={showPassword ? <VisibilityOff sx={{ color: "#666666" }} /> : <Visibility sx={{ color: "#666666" }} />}
                            handleEndIconClick={() => setShowPassword((prev) => !prev)}
                            className={styles?.login_input}
                            startIcon={<img src={KeyIcon} alt="Email Icon" style={{ width: 24, height: 24 }} />}
                        />
                        <MuiInput
                            label="Confirm Password"
                            type={showPassword ? "text" : "password"}
                            placeholder="*********"
                            {...register("confirmPassword")}
                            error={Boolean(errors.confirmPassword)}
                            helperText={errors.confirmPassword?.message}
                            isRequired
                            endIcon={showPassword ? <VisibilityOff sx={{ color: "#666666" }} /> : <Visibility sx={{ color: "#666666" }} />}
                            handleEndIconClick={() => setShowPassword((prev) => !prev)}
                            className={styles?.login_input}
                            startIcon={<img src={KeyIcon} alt="Password Icon" style={{ width: 24, height: 24 }} />}
                        />

                        <Box display="flex" alignItems="center" mt={1} mb={2}>
                            <input type="checkbox" {...register("terms")} id="terms" />
                            <label htmlFor="terms" style={{ marginLeft: 8, fontSize: 14, color: "var(--text-color)" }}>
                                I accept the <a href="https://voiceagent.ai/" target="_blank" rel="noopener noreferrer" className={styles.highlightLink}>Terms & Conditions</a>
                            </label>
                        </Box>
                        {errors.terms && (
                            <Typography color="error" variant="body2" sx={{ mb: 2 }}>
                                {errors.terms.message}
                            </Typography>
                        )}

                        <MuiButton text={BUTTON_LABEL?.REGISTER || "Sign Up"} type="submit" fullWidth className={styles?.login_btn} />
                    </AuthLayout>
            }
        </>

    );
}

import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  CircularProgress,
  Container,
  Typography,
  Paper,
  Button,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import AuthService from "../../services/authService";
import { ROUTES } from "../../constants/constant";

const VerifyEmailPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");

  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");
  const [isError, setIsError] = useState(false);

  const verifyEmail = async () => {
    try {
      await AuthService.verifyEmail(token);
      setStatus("Email verified successfully! Redirecting to login...");
      setIsError(false);
      setLoading(false);
      setTimeout(() => navigate(ROUTES.LOGIN), 3000);
    } catch (error) {
      setStatus(error.response?.data?.message || "Verification failed.");
      setIsError(true);
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!token) {
      setStatus("Invalid or missing verification token.");
      setIsError(true);
      setLoading(false);
      return;
    }

    verifyEmail();
  }, [token, navigate]);

  return (
    <Container maxWidth="sm">
      <Paper
        elevation={3}
        sx={{ padding: 4, mt: 8, textAlign: "center", borderRadius: 3 }}
      >
        {loading ? (
          <>
            <CircularProgress />
            <Typography variant="h6" mt={2}>
              Verifying your email...
            </Typography>
          </>
        ) : (
          <>
            {isError ? (
              <>
                <ErrorIcon color="error" sx={{ fontSize: 48 }} />
                <Typography variant="h6" mt={2} color="error">
                  {status}
                </Typography>
                <Typography
                  variant="body2"
                  color="primary"
                  sx={{ mt: 2 }}
                >
                  Ask Support team to Resend Email
                </Typography>
              </>
            ) : (
              <>
                <CheckCircleIcon color="success" sx={{ fontSize: 48 }} />
                <Typography variant="h6" mt={2} color="green">
                  {status}
                </Typography>
              </>
            )}
          </>
        )}
      </Paper>
    </Container>
  );
};

export default VerifyEmailPage;

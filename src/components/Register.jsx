import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Paper, Typography, TextField, Button, InputAdornment, IconButton, Alert, Stepper, Step, StepLabel } from "@mui/material";
import {
    Mail as MailIcon,
    Lock as LockIcon,
    Person as PersonIcon,
    Visibility,
    VisibilityOff,
} from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { STEPS } from "../constants";
import { registerAction } from "../action/users";
import { useLocalError } from "../hooks/error";

const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { localError, setLocalError } = useLocalError();

    const [activeStep, setActiveStep] = useState(0);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });

    const handleNext = () => {
        if (activeStep === 0 && !formData.username) {
            setLocalError("אנא הזן שם מלא");
            return;
        }
        setActiveStep((prev) => prev + 1);
        setLocalError("");
    };

    const handleBack = () => {
        setActiveStep((prev) => prev - 1);
        setLocalError("");
    };

    const register = async (e) => {
        e.preventDefault();
        if (activeStep < STEPS.length - 1) return handleNext();

        const { code, message } = await dispatch(registerAction(formData, dispatch));
        if(code !== 200) return setLocalError(message);

        navigate("/login");
    };

    const renderTextField = ( label, type, value, onChange, iconStart, iconEnd = null ) => (
        <TextField
            label={label}
            type={type}
            value={value}
            onChange={onChange}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        {iconStart}
                    </InputAdornment>
                ),
                endAdornment: iconEnd,
            }}
            required
            sx={{
                "& .MuiOutlinedInput-root": {
                    "&:hover fieldset": { borderColor: "#6366f1" },
                    "&.Mui-focused fieldset": { borderColor: "#6366f1" },
                },
                "& .MuiInputLabel-root.Mui-focused": { color: "#6366f1" },
            }}
        />
    );

    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "linear-gradient(135deg, #f6f9fc 0%, #eef2ff 100%)",
                p: 3,
            }}
        >
            <Paper
                sx={{
                    p: { xs: 3, sm: 4 },
                    width: "100%",
                    maxWidth: "440px",
                    borderRadius: 3,
                    boxShadow: "1px 1px 4px 24px rgba(0, 0, 0, 0.05)",
                }}
            >
                <Box sx={{ textAlign: "center", mb: 4 }}>
                    <Typography
                        variant="h4"
                        sx={{
                            fontWeight: 700,
                            backgroundImage:
                                "linear-gradient(45deg, #6366f1, #8b5cf6)",
                            backgroundClip: "text",
                            color: "transparent",
                            mb: 1,
                        }}
                    >
                        הרשמה
                    </Typography>
                    <Typography color="text.secondary" variant="body2">
                        צרו חשבון חדש בקלות ובמהירות
                    </Typography>
                </Box>

                <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
                    {STEPS.map((label, index) => (
                        <Step key={index}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>

                <form onSubmit={register}>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 2.5,
                        }}
                    >
                        {activeStep === 0 ? (
                            renderTextField(
                                "שם מלא",
                                "text",
                                formData.username,
                                (e) =>
                                    setFormData({
                                        ...formData,
                                        username: e.target.value,
                                    }),
                                <PersonIcon sx={{ color: "text.secondary" }} />
                            )
                        ) : (
                            <>
                                {renderTextField(
                                    "אימייל",
                                    "email",
                                    formData.email,
                                    (e) =>
                                        setFormData({
                                            ...formData,
                                            email: e.target.value,
                                        }),
                                    <MailIcon
                                        sx={{ color: "text.secondary" }}
                                    />
                                )}
                                {renderTextField(
                                    "סיסמה", 
                                    showPassword ? "text" : "password", formData.password, (e) =>
                                        setFormData({
                                            ...formData,
                                            password: e.target.value,
                                        }),
                                    <LockIcon sx={{ color: "text.secondary" }} />,
                                    <IconButton
                                        edge="end"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? (
                                            <VisibilityOff />
                                        ) : (
                                            <Visibility />
                                        )}
                                    </IconButton>
                                )}
                            </>
                        )}

                        {localError && (
                            <Alert severity="error" sx={{ mb: 3 }}>
                                {localError}
                            </Alert>
                        )}


                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                mt: 1,
                            }}
                        >
                            <Button
                                onClick={handleBack}
                                disabled={activeStep === 0}
                                sx={{
                                    color: "#6366f1",
                                    "&:hover": {
                                        bgcolor: "transparent",
                                        textDecoration: "underline",
                                    },
                                }}
                            >
                                חזרה
                            </Button>
                            <Button
                                type="submit"
                                variant="contained"
                                sx={{
                                    bgcolor: "#6366f1",
                                    "&:hover": { bgcolor: "#4f46e5" },
                                    textTransform: "none",
                                    px: 4,
                                }}
                            >
                                {activeStep === STEPS.length - 1
                                    ? "סיום הרשמה"
                                    : "המשך"}
                            </Button>
                        </Box>

                        {activeStep === 0 && (
                            <Box sx={{ textAlign: "center", mt: 1 }}>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    כבר יש לך חשבון?{" "}
                                    <Button
                                        onClick={() => navigate("/login")}
                                        sx={{
                                            color: "#6366f1",
                                            textTransform: "none",
                                            fontWeight: 500,
                                            p: 0,
                                            "&:hover": {
                                                bgcolor: "transparent",
                                                textDecoration: "underline",
                                            },
                                        }}
                                    >
                                        התחבר
                                    </Button>
                                </Typography>
                            </Box>
                        )}
                    </Box>
                </form>
            </Paper>
        </Box>
    );
};

export default Register;
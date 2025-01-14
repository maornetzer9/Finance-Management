import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Paper, Typography, TextField, Button, InputAdornment, IconButton, Alert } from "@mui/material";
import { Mail as MailIcon, Lock as LockIcon, Visibility, VisibilityOff } from "@mui/icons-material";
import { loginAction } from "../action/users";
import { useDispatch } from "react-redux";
import { useLocalError } from "../hooks/error";
import { useAuth } from "../context/AuthProvider";

const Login = () => {

    const { setLocalToken } = useAuth();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { localError, setLocalError } = useLocalError();

    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    
    const login = async (e) => {
        e.preventDefault();

        if(formData.email === '' || formData.password === '') return setLocalError('One of the details are missing.');

        const{ code, message, token } = await dispatch(loginAction(formData))  

        if(code !== 200) return setLocalError(message);
        
        setLocalToken(token)
        navigate("/dashboard");
    };

    return (
        <Box
            component={'div'}
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
                component={Paper}
                sx={{
                    p: { xs: 3, sm: 4 },
                    width: "100%",
                    maxWidth: "440px",
                    borderRadius: 3,
                    boxShadow: "1px 1px 4px 24px rgba(0, 0, 0, 0.05)",
                }}
            >
                {/* Logo & Title */}
                <Box component={'div'} className="card" sx={{ textAlign: "center", mb: 4 }}>
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
                        ברוכים הבאים
                    </Typography>
                    <Typography color="text.secondary" variant="body2">
                        התחברו כדי לנהל את הפיננסים שלכם
                    </Typography>
                </Box>

               
                {/* Login Form */}
                <form onSubmit={login}>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 2.5,
                        }}
                    >
                        <TextField
                            label="אימייל"
                            type="email"
                            value={formData.email}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    email: e.target.value,
                                })
                            }
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <MailIcon
                                            sx={{ color: "text.secondary" }}
                                        />
                                    </InputAdornment>
                                ),
                            }}
                            required
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    "&:hover fieldset": {
                                        borderColor: "#6366f1",
                                    },
                                    "&.Mui-focused fieldset": {
                                        borderColor: "#6366f1",
                                    },
                                },
                                "& .MuiInputLabel-root.Mui-focused": {
                                    color: "#6366f1",
                                },
                            }}
                        />

                        <TextField
                            label="סיסמה"
                            type={showPassword ? "text" : "password"}
                            value={formData.password}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    password: e.target.value,
                                })
                            }
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <LockIcon
                                            sx={{ color: "text.secondary" }}
                                        />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() =>
                                                setShowPassword(!showPassword)
                                            }
                                            edge="end"
                                        >
                                            {showPassword ? (
                                                <VisibilityOff />
                                            ) : (
                                                <Visibility />
                                            )}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                            required
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    "&:hover fieldset": {
                                        borderColor: "#6366f1",
                                    },
                                    "&.Mui-focused fieldset": {
                                        borderColor: "#6366f1",
                                    },
                                },
                                "& .MuiInputLabel-root.Mui-focused": {
                                    color: "#6366f1",
                                },
                            }}
                        />

                         {/* Error Alert */}
                        {localError && (
                            <Alert severity="error" sx={{ mb: 3 }}>
                                {localError}
                            </Alert>
                        )}

                        <Button
                            type="submit"
                            variant="contained"
                            size="large"
                            sx={{
                                mt: 1,
                                bgcolor: "#6366f1",
                                "&:hover": {
                                    bgcolor: "#4f46e5",
                                },
                                textTransform: "none",
                                py: 1.5,
                            }}
                        >
                            התחברות
                        </Button>

                        <Box sx={{ textAlign: "center", mt: 1 }}>
                            <Typography variant="body2" color="text.secondary">
                                עדיין אין לך חשבון?{" "}
                                <Button
                                    onClick={() => navigate("/register")}
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
                                    הירשם עכשיו
                                </Button>
                            </Typography>
                        </Box>
                    </Box>
                </form>
            </Paper>
        </Box>
    );
};

export default Login;
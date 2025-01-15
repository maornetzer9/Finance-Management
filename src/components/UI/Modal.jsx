import React from "react";
import { Dialog, DialogTitle, DialogContent, TextField, Button, Box, IconButton, InputLabel } from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";

export default function Modal({ open, onClose, onSubmit, title, onChangeHandler }) {

    const textFieldStyles = {
        "& .MuiOutlinedInput-root": {
            "& fieldset": {
                borderColor: "#E2E8F0",
            },
            "&:hover fieldset": {
                borderColor: "#CBD5E0",
            },
            "&.Mui-focused fieldset": {
                borderColor: "#7B5CFF",
            },
        },
        "& .MuiInputLabel-root": {
            color: "#718096",
            "&.Mui-focused": {
                color: "#7B5CFF",
            },
        },
        textAlign: "right",
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="sm"
            fullWidth
            PaperProps={{
                sx: {
                    borderRadius: 2,
                    p: 2,
                },
            }}
        >
            <DialogTitle
                sx={{
                    p: 2,
                    fontSize: "1.5rem",
                    fontWeight: 500,
                    color: "#2D3748",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                { title }
                <IconButton
                    onClick={onClose}
                    size="small"
                    sx={{ color: "#718096" }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>

            <DialogContent sx={{ p: 2 }}>
                <form onSubmit={onSubmit}>
                    <Box
                        component={"div"}
                        className="modal-content"
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 2.5,
                        }}
                    >
                        <InputLabel variant="standard"> קטגוריה </InputLabel>
                        {/* Category Field */}
                        <TextField
                            name="category"
                            fullWidth
                            sx={textFieldStyles}
                            onChange={onChangeHandler}
                        />

                        {/* Amount Field */}
                        <InputLabel variant="standard"> סכום </InputLabel>

                        <TextField
                            name="amount"
                            type="number"
                            fullWidth
                            sx={textFieldStyles}
                            onChange={onChangeHandler}
                        />

                        {/* Description Field */}
                        <InputLabel variant="standard"> תיאור </InputLabel>
                        
                        <TextField
                            name="description"
                            fullWidth
                            sx={textFieldStyles}
                            onChange={onChangeHandler}
                        />

                        {/* Date Field */}
                        <InputLabel variant="standard"> תאריך </InputLabel>

                        <TextField
                            name="createdAt"
                            type="date"
                            fullWidth
                            defaultValue={new Date().toISOString().split("T")[0]}
                            InputLabelProps={{ shrink: true }}
                            inputProps={{ style: { textAlign: "right" } }}
                            onChange={onChangeHandler}
                            sx={textFieldStyles}
                        />

                        {/* Buttons */}
                        <Box
                            sx={{
                                display: "flex",
                                gap: 2,
                                justifyContent: "flex-end",
                                mt: 2,
                            }}
                        >
                            <Button
                                onClick={onClose}
                                sx={{
                                    color: "#718096",
                                    bgcolor: "#EDF2F7",
                                    "&:hover": {
                                        bgcolor: "#E2E8F0",
                                    },
                                    px: 4,
                                }}
                            >
                                ביטול
                            </Button>
                            <Button
                                className="button"
                                type="submit"
                                sx={{
                                    background: "linear-gradient(to right, #4f46e5, #7c3aed)",
                                    color: "white",
                                }}
                            >
                                שמור
                            </Button>
                        </Box>
                    </Box>
                </form>
            </DialogContent>
        </Dialog>
    );
}
import React, { useEffect, useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from "@mui/material";

export default function ReusableModal({
    title,
    onSubmit,
    inputFields,
    isModalOpen,
    inputsData = {},
    setIsModalOpen,
    handleInputChange2,
    mode = "edit", // "edit" or "create"
    cancelText = "ביטול",
    submitText,
}) {
    
    const [formData, setFormData] = useState(
        inputFields.reduce((acc, field) => {
            acc[field.name] = mode === "edit" ? inputsData[field.name] || "" : "";
            return acc;
        }, {})
    );

    // Update formData only when modal is opened
    useEffect(() => {
        if (isModalOpen) {
            const updatedFields = inputFields.reduce((acc, field) => {
                acc[field.name] = mode === "edit" ? inputsData[field.name] || "" : "";
                return acc;
            }, {});
            setFormData(updatedFields);
        }
    }, [isModalOpen]); // Only trigger when modal opens

    const handleInputChange = ({ target: { name, value, type } }) => {
        setFormData((prev) => ({
            ...prev,
            [name]: type === "number" ? parseFloat(value) : value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
        resetForm();
    };

    const resetForm = () => {
        setIsModalOpen(false);
        setFormData(
            inputFields.reduce((acc, field) => {
                acc[field.name] = mode === "edit" ? inputsData[field.name] || "" : "";
                return acc;
            }, {})
        );
    };

    return (
        <Dialog open={isModalOpen} onClose={resetForm} fullWidth maxWidth="xs">
            <form onSubmit={handleSubmit}>
                <DialogTitle sx={{ fontWeight: 600 }}>
                    {title}
                </DialogTitle>
                <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
                    {inputFields.map((field, index) => (
                        <TextField
                            key={index}
                            label={field.label}
                            name={field.name}
                            type={field.type || "text"}
                            defaultValue={
                                field.type === "date" && inputsData[field.name]
                                    ? inputsData[field.name].slice(0, 10)
                                    : inputsData[field.name] || ""
                            }
                            onChange={handleInputChange || handleInputChange2}
                            required={field.required}
                            fullWidth
                        />
                    ))}
                </DialogContent>
                <DialogActions sx={{ p: 3 }}>
                    <Button
                        onClick={resetForm}
                        sx={{
                            color: "#6B7280",
                            "&:hover": { bgcolor: "#F1F5F9" },
                        }}
                    >
                        {cancelText}
                    </Button>
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{
                            background: "linear-gradient(to right, #4f46e5, #7c3aed)",
                        }}
                    >
                        {submitText || (mode === "edit" ? "שמירה" : "צור")}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}
import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { transactionFileAction, transactionFileHeaderAction } from "../../action/transactions";
import { useLocalError } from "../../hooks/error";

export default function TransactionFile() {
    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.transactionsReducer);


    const [ file, setFile ] = useState(null);
    const [ mapping, setMapping ] = useState([]);

    const { localError, setLocalError } = useLocalError();

    const fileHandler = (file) => setFile(file);
    
    const fileUpload = async (file) => {
        setFile(file);
        const formData = new FormData();
        await formData.append('file', file);
        
        const { code, message, mapping } = await dispatch(transactionFileHeaderAction(formData));
        if(code !== 200) return setLocalError(message);
        setMapping(mapping);
    }

    // const transactionFileHandler = async () => {
    //     const formData = new FormData();
    //     formData.append('file', file);
    //     formData.append('mapping', JSON.stringify(mapping));
        
    //     const { code, message } = await dispatch(transactionFileAction(formData));
    //     if(code !== 200) return setLocalError(message);
    //     setMapping([]);
    //     setFile(null);
    // }

    const transactionFileHandler = async () => {
        const formData = new FormData();
        formData.append('file', file);
        
        const { code, message } = await dispatch(transactionFileAction(formData));
        if(code !== 200) return setLocalError(message);
        setMapping([]);
        setFile(null);
    }

    return (
        <Box component={"div"} margin={"auto"}>
            <Box
                gap={1}
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                ml={2}
                sx={{
                    p: { xs: 0, md: 1 },
                    border: "2px dashed #2D3748",
                    borderRadius: 2,
                    backgroundColor: "#F7FAFC",
                    textAlign: "center",
                    cursor: "pointer",
                    "&:hover": {
                        backgroundColor: "#EDF2F7",
                    },
                }}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                    e.preventDefault();
                    fileUpload(e.dataTransfer.files[0]); 
                }}
            >
                <Typography
                    variant="subtitle2"
                    color={localError ? 'red' : '#2D3748'}
                    sx={{ mb: 0, display: { xs: "none", md: "flex" } }}
                >
                    {localError ? localError : 'גרור ושחרר קובץ כאן, או לחץ לבחירה'}
                </Typography>
                <Button
                    variant="contained"
                    component="label"
                    onClick={() => (file !== null ? transactionFileHandler() : null)}
                    disabled={loading ? true : false}
                    sx={{
                        backgroundColor: "#2D3748",
                        color: "#fff",
                        textTransform: "none",
                        borderRadius: 1,
                        "&:hover": {
                            backgroundColor: "#1A202C",
                        },
                    }}
                >
                    {mapping?.length === 0 ? 'בחר קובץ' || 
                    <input
                        type={mapping?.length === 0 ? 'file' : 'button'}
                        name="file"
                        hidden

                        onChange={(e) => fileHandler(e.target.files[0])} 
                    />
                    : 'שלח'}
                </Button>
            </Box>

            {/* Display file name if a file is selected */}
            {file && (
                <Typography
                    variant="body2"
                    color="#2D3748"
                    mt={2}
                    textAlign="center"
                >
                   { mapping?.length !== 0 ?  `קובץ נבחר:${file.name}` : localError }
                </Typography>
            )}
        </Box>
    );
}

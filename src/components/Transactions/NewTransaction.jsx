import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { FORM_FIELDS_TRANSACTIONS } from "../../constants";
import { useAddTransaction } from "../../hooks/transactions";
import { useMenuAnchor } from "../../hooks/modal";
import ReusableModal from "../ReusableModal";

export default function NewTransaction() {

     const { addNewTransaction } = useAddTransaction(); 
     const { isDialogOpen, openDialog, closeDialog, selectedData } = useMenuAnchor();

    return (
        <Box component={'div'}>
        <Box
            mb={2}
            display="flex"
            flexDirection="column"
            alignItems="flex-start"
            justifyContent="space-evenly"
            sx={{ flex: 1, gap: 1 }}
        >
            <Typography
                variant="h6"
                sx={{
                    fontWeight: 500,
                    color: "#2D3748",
                }}
            >
                טבלת עסקאות
            </Typography>
            <Button
                className="button"
                variant="contained"
                onClick={openDialog}
                sx={{
                    width: "100%",
                    background: "linear-gradient(to right, #4f46e5, #7c3aed)",
                    transition: "transform 0.5s ease-in-out",
                    "&:hover": {
                        transform: "scale(0.9)",
                        transition: "transform 0.5s",
                    },
                }}
            >
                הוסף עסקה
            </Button>
        </Box>

        <ReusableModal
                title={'הוסף הוצאה חדשה'}
                isModalOpen={isDialogOpen}
                inputFields={FORM_FIELDS_TRANSACTIONS}
                setIsModalOpen={closeDialog}
                onSubmit={addNewTransaction}              
                inputsData={selectedData || {}} 
                mode="create"
            />
        </Box>
    );
}

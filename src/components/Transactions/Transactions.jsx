import React from "react";
import TransactionChart from "./TransactionChart";
import TransactionTable from "./TransactionTable";
import { Alert, Box, Typography } from "@mui/material";
import { useAddTransaction } from "../../hooks/transactions";

export default function Transactions() {
  
    const { localError } = useAddTransaction(); 

    return (
        <>
            <Box 
                component={'div'} 
                display={'flex'} 
                alignItems={'center'}
                justifyContent={'space-between'} 
            >
                <Typography
                    variant="h3"
                    color="textPrimary"
                    display={"flex"}
                    mt={5}
                    mb={5}
                >
                    עסקאות
                </Typography>
                
                {localError && 
                    <Alert 
                        variant="outlined" 
                        severity="error"
                        color="error"
                    >
                        {localError}
                    </Alert>
                }
            </Box>

                <TransactionChart/>
                <TransactionTable/>

            <Typography
                variant="h3"
                color="textPrimary"
                display={"flex"}
                mt={5}
            >
                השקעות
            </Typography>
          
        </>
    );
}
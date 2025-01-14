
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocalError } from "./error";
import { getTransactionByMonthAction, newTransactionAction } from "../action/transactions";


// TODO: Dont use the localError here make it with new state and get pass then error to the component and in the component use the hook of useLocalError.
export const useAddTransaction = () => {
    
    const dispatch = useDispatch();
    const { localError, setLocalError } = useLocalError();

    const addNewTransaction = async (newTransaction) => {

        if (!newTransaction?.businessName 
            || !newTransaction?.amount 
            || !newTransaction?.transactionType 
            || !newTransaction?.chargeDate 
            || !newTransaction?.transactionDate) 
        return alert("All fields are required."); 

        try 
        {
            const { code, message } = await dispatch(newTransactionAction(newTransaction, dispatch));
            if (code !== 200) return setLocalError(message);
        } 
        catch(err) 
        {
            console.error("Error adding transaction:", err.message);
        }
    };

    return { 
        addNewTransaction, 
        localError
    };
};

export const useGetTransactionByMonth = () => {
    const [error, setError] = useState('');

    const selectedMonthHandler = (month, setSelectedMonth) => setSelectedMonth(month);

    const getTransactionByMonth = async ( month, dispatch ) => {
        try
        {
            const { code, message } = await dispatch(getTransactionByMonthAction(month));              
            if(code !== 200 | code === 3) return setError(message);
        }
        catch(err)
        {
            console.error(err.message);
        }
    };

    return { selectedMonthHandler, getTransactionByMonth, error }; 
};

import { deleteRequest, post, put } from "../api/apiClient";
import { getTransactionByMonthRoute } from "../api/transactions";
import { newTransactionRoute } from "../api/transactions";
import { getTransactionsByIdRoute } from "../api/transactions";

export const NEW_TRANSACTION_LOADING = 'NEW_TRANSACTION_LOADING';
export const NEW_TRANSACTION_SUCCESS = 'NEW_TRANSACTION_SUCCESS';
export const NEW_TRANSACTION_FAILURE = 'NEW_TRANSACTION_FAILURE';

export const EDIT_TRANSACTION_LOADING = 'EDIT_TRANSACTION_LOADING';
export const EDIT_TRANSACTION_SUCCESS = 'EDIT_TRANSACTION_SUCCESS';
export const EDIT_TRANSACTION_FAILURE = 'EDIT_TRANSACTION_FAILURE';

export const DELETE_TRANSACTION_LOADING = 'DELETE_TRANSACTION_LOADING';
export const DELETE_TRANSACTION_SUCCESS = 'DELETE_TRANSACTION_SUCCESS';
export const DELETE_TRANSACTION_FAILURE = 'DELETE_TRANSACTION_FAILURE';

export const GET_TRANSACTIONS_BY_ID_LOADING = 'GET_TRANSACTIONS_BY_ID_LOADING';
export const GET_TRANSACTIONS_BY_ID_SUCCESS = 'GET_TRANSACTIONS_BY_ID_SUCCESS';
export const GET_TRANSACTIONS_BY_ID_FAILURE = 'GET_TRANSACTIONS_BY_ID_FAILURE';

export const GET_TRANSACTIONS_BY_MONTH_LOADING = 'GET_TRANSACTIONS_BY_MONTH_LOADING';
export const GET_TRANSACTIONS_BY_MONTH_SUCCESS = 'GET_TRANSACTIONS_BY_MONTH_SUCCESS';
export const GET_TRANSACTIONS_BY_MONTH_FAILURE = 'GET_TRANSACTIONS_BY_MONTH_FAILURE';

export const TRANSACTION_FILE_CONVERTOR_LOADING = 'TRANSACTION_FILE_CONVERTOR_LOADING';
export const TRANSACTION_FILE_CONVERTOR_SUCCESS = 'TRANSACTION_FILE_CONVERTOR_SUCCESS';
export const TRANSACTION_FILE_CONVERTOR_FAILURE = 'TRANSACTION_FILE_CONVERTOR_FAILURE';

// TODO: Remove total here and in the reducer if you don`t need him.
export const getTransactionsByIdAction = () => async (dispatch) => {

    await dispatch({type: GET_TRANSACTIONS_BY_ID_LOADING});

    const { code, message, transactions, total } = await getTransactionsByIdRoute();

    if(code !== 200) 
    {
        await dispatch({type: GET_TRANSACTIONS_BY_ID_FAILURE, payload: message});
        return { code, message };
    }
        
    await dispatch({type: GET_TRANSACTIONS_BY_ID_SUCCESS, payload: { transactions, total }});
    return { code, message };
};


export const getTransactionByMonthAction = (month) => async (dispatch) => {

    await dispatch({type: GET_TRANSACTIONS_BY_MONTH_LOADING});

    const { code, message, transactions, total } = await getTransactionByMonthRoute(month);

    if(code !== 200 && code !== 3) 
    {
        await dispatch({type: GET_TRANSACTIONS_BY_MONTH_FAILURE, payload: message});
        return { code, message };
    }
        
    await dispatch({type: GET_TRANSACTIONS_BY_MONTH_SUCCESS, payload: { transactions, total }});
    return { code, message };
};


export const newTransactionAction = ( newTransaction ) => async (dispatch) => {

    await dispatch({type: NEW_TRANSACTION_LOADING});

    const { code, message, transaction } = await newTransactionRoute(newTransaction);

    if(code !== 200) 
    {
        await dispatch({type: NEW_TRANSACTION_FAILURE, payload: message});
        return { code, message };
    }
        
    await dispatch({type: NEW_TRANSACTION_SUCCESS, payload: transaction});
    return { code, message };
};


export const editTransactionAction = ( updatedTransaction ) => async (dispatch) => {
    
    await dispatch({type: EDIT_TRANSACTION_LOADING});

    const url = '/transactions/edit_transaction';
    const { code, message, transaction } = await put(url, updatedTransaction);

    if(code !== 200) 
    {
        await dispatch({type: EDIT_TRANSACTION_FAILURE, payload: message});
        return { code, message };
    }
        
    await dispatch({type: EDIT_TRANSACTION_SUCCESS, payload: transaction});
    return { code, message };
};


export const deleteTransactionAction = (id) => async (dispatch) => {

    await dispatch({type: DELETE_TRANSACTION_LOADING});

    const url = `/transactions/delete_transaction`;
    const { code, message } = await deleteRequest(url, id);

    if(code !== 200) 
    {
        await dispatch({type: DELETE_TRANSACTION_FAILURE, payload: message});
        return { code, message };
    }
        
    await dispatch({type: DELETE_TRANSACTION_SUCCESS, payload: id});
    return { code, message };
};

// TODO: Implement reducer logic here if needed.
export const transactionFileHeaderAction = ( file ) => async (dispatch) => {
    

    // await dispatch({type: TRANSACTION_FILE_CONVERTOR_LOADING});

    const url = '/transactions/extract_headers';
    const { code, message, mapping } = await post(url, file);

    if(code !== 200) 
    {
        await dispatch({type: TRANSACTION_FILE_CONVERTOR_FAILURE, payload: message});
        return { code, message };
    }
        
    // await dispatch({type: TRANSACTION_FILE_CONVERTOR_SUCCESS, payload: { transactions, total }});
    return { code, message, mapping };
};

export const transactionFileAction = ( formData ) => async (dispatch) => {
    

    await dispatch({type: TRANSACTION_FILE_CONVERTOR_LOADING});

    const url = '/transactions/transaction_file';
    const { code, message, transactions, total } = await post(url, formData);

    if(code !== 200) 
    {
        await dispatch({type: TRANSACTION_FILE_CONVERTOR_FAILURE, payload: message});
        return { code, message };
    }
        
    await dispatch({type: TRANSACTION_FILE_CONVERTOR_SUCCESS, payload: { transactions, total }});
    return { code, message };
};
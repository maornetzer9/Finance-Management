import { 
    GET_TRANSACTIONS_BY_ID_FAILURE, 
    GET_TRANSACTIONS_BY_ID_LOADING, 
    GET_TRANSACTIONS_BY_ID_SUCCESS, 
    NEW_TRANSACTION_FAILURE, 
    NEW_TRANSACTION_LOADING, 
    NEW_TRANSACTION_SUCCESS,
    DELETE_TRANSACTION_LOADING,
    DELETE_TRANSACTION_SUCCESS,
    DELETE_TRANSACTION_FAILURE,
    GET_TRANSACTIONS_BY_MONTH_LOADING,
    GET_TRANSACTIONS_BY_MONTH_SUCCESS,
    GET_TRANSACTIONS_BY_MONTH_FAILURE,
    EDIT_TRANSACTION_SUCCESS,
    EDIT_TRANSACTION_FAILURE,
    EDIT_TRANSACTION_LOADING,
    TRANSACTION_FILE_CONVERTOR_LOADING,
    TRANSACTION_FILE_CONVERTOR_FAILURE,
    TRANSACTION_FILE_CONVERTOR_SUCCESS,
 } from "../action/transactions";

const initialState = {
    transactions: [],
    total: 0,
    error: null,
    loading: false,
};

export const transactionsReducer = (state = initialState, action) => {
    switch (action.type) 
    {
        case TRANSACTION_FILE_CONVERTOR_LOADING:
        case GET_TRANSACTIONS_BY_MONTH_LOADING:
        case GET_TRANSACTIONS_BY_ID_LOADING:
        case DELETE_TRANSACTION_LOADING:
        case EDIT_TRANSACTION_LOADING:
        case NEW_TRANSACTION_LOADING:
            return {
                ...state,
                error: null,
                loading: true,
            };

        case NEW_TRANSACTION_SUCCESS:
            return {
                ...state,
                transactions: [...state.transactions, action.payload], 
                loading: false,
                error: null
            };

        case GET_TRANSACTIONS_BY_ID_SUCCESS: {

            const { transactions, total } = action.payload;

            return {
                ...state,
                transactions,
                total,
                loading: false,
                error: null
            };
        };

        case GET_TRANSACTIONS_BY_MONTH_SUCCESS: {

            const { transactions, total } = action.payload;

            return {
                ...state,
                transactions,
                total,
                loading: false,
                error: null
            };
        };

        case EDIT_TRANSACTION_SUCCESS: {

            const clone = [...state.transactions];
            const index = clone.findIndex(transaction => transaction._id === action.payload._id);

            if(index !== -1)
            {
                clone[index] = action.payload;
            }

            return {
                ...state,
                transactions: clone,
                loading: false,
                error: null
            };
        };

        case DELETE_TRANSACTION_SUCCESS:{

            const transactions = state?.transactions?.filter(transaction => transaction._id !== action.payload); 

            return {
                ...state,
                transactions,
                loading: false,
                error: null
            };
        };
        
        case TRANSACTION_FILE_CONVERTOR_SUCCESS:{
            const { total, transactions } = action.payload;

            return {
                ...state,
                transactions,
                total,
                loading: false,
                error: null
            };
        };

        case NEW_TRANSACTION_FAILURE:
        case EDIT_TRANSACTION_FAILURE:
        case DELETE_TRANSACTION_FAILURE:
        case GET_TRANSACTIONS_BY_ID_FAILURE:
        case GET_TRANSACTIONS_BY_MONTH_FAILURE:
        case TRANSACTION_FILE_CONVERTOR_FAILURE:
            return {
                ...state,
                error: action.payload,
                loading: false,
            };

        default: return state;
    }
};

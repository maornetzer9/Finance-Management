import { get, post } from "./apiClient";


export const getTransactionByMonthRoute = async (month) => {
    try
    {
        const url = `/transactions/get_transactions_by_month`;
        const data = await get(`${url}/${month}`);

        return data;
    }
    catch(err)
    {
        console.error(err.message);
        throw new Error(err.message);
    }
};

export const getTransactionsByIdRoute = async (form) => {
    try
    {
        const url = `/transactions/get_transactions_by_id`;
        const data = await get(url, form);
        
        return data;
    }
    catch(err)
    {
        console.error(err.message);
        throw new Error(err.message);
    }
};

export const newTransactionRoute = async (form) => {
    try
    {
        const url = `/transactions/new_transaction`;
        const data = await post(url, form);
        
        return data;
    }
    catch(err)
    {
        console.error(err.message);
        throw new Error(err.message);
    }
};

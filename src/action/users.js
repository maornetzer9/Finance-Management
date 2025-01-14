import { post } from "../api/apiClient";

export const LOGIN_LOADING = 'LOGIN_LOADING';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const REGISTER_LOADING = 'REGISTER_LOADING';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';


export const loginAction = ( form ) => async (dispatch) => {

    dispatch({type: REGISTER_LOADING});

    const url = `/users/login`;
    const { code, message, user, token } = await post(url, form);

    if(code !== 200) 
    {
        await dispatch({type: REGISTER_FAILURE, payload: message});
        return { code, message }
    }
    
    await dispatch({type: REGISTER_SUCCESS, payload: user});
    return { code, message, token }
};


export const registerAction = ( form ) => async (dispatch) => {

    dispatch({type: REGISTER_LOADING});

    const url = `/users/register`;
    const { code, message, user } = await post(url, form);

    if(code !== 200) 
    {
        await dispatch({type: REGISTER_FAILURE, payload: message});
        return { code, message }
    }
    
    await dispatch({type: REGISTER_SUCCESS, payload: user});
    return { code, message }
};
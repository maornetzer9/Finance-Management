import { deleteRequest, get, post, put } from "../api/apiClient";

export const GET_ASSETS_LOADING = 'GET_ASSETS_LOADING';
export const GET_ASSETS_SUCCESS = 'GET_ASSETS_SUCCESS';
export const GET_ASSETS_FAILURE = 'GET_ASSETS_FAILURE';

export const NEW_ASSET_LOADING = 'NEW_ASSET_LOADING';
export const NEW_ASSET_SUCCESS = 'NEW_ASSET_SUCCESS';
export const NEW_ASSET_FAILURE = 'NEW_ASSET_FAILURE';

export const EDIT_ASSET_LOADING = 'EDIT_ASSET_LOADING';
export const EDIT_ASSET_SUCCESS = 'EDIT_ASSET_SUCCESS';
export const EDIT_ASSET_FAILURE = 'EDIT_ASSET_FAILURE';

export const DELETE_ASSETS_LOADING = 'DELETE_ASSETS_LOADING';
export const DELETE_ASSETS_SUCCESS = 'DELETE_ASSETS_SUCCESS';
export const DELETE_ASSETS_FAILURE = 'DELETE_ASSETS_FAILURE';


export const getAssetsAction = () => async (dispatch) => {
    
    await dispatch({type: GET_ASSETS_LOADING});

    const url = `/assets/get_assets`;
    const { code, message, assets, summary } = await get(url);

    if(code !== 200) 
    {
        await dispatch({type: GET_ASSETS_FAILURE, payload: message});
        return { code, message }
    }
        
    await dispatch({type: GET_ASSETS_SUCCESS, payload: { assets, summary }});
    return { code, message }
};


export const newAssetAction = (form) => async (dispatch) => {
    
    await dispatch({type: NEW_ASSET_LOADING});

        const url = `/assets/new_asset`;
        const { code, message, asset, summary } = await post(url, form);

    if(code !== 200) 
    {
        await dispatch({type: NEW_ASSET_FAILURE, payload: message});
        return { code, message }
    }
        
    await dispatch({type: NEW_ASSET_SUCCESS, payload: { asset, summary }});
    return { code, message }
};


export const editAssetAction = (form) => async (dispatch) => {
    
    await dispatch({type: EDIT_ASSET_LOADING});

    const url = `/assets/edit_asset`;
    const { code, message, asset, summary } = await put(url, form);

    if(code !== 200) 
    {
        await dispatch({type: EDIT_ASSET_FAILURE, payload: message});
        return { code, message }
    }
        
    await dispatch({type: EDIT_ASSET_SUCCESS, payload: { asset, summary }});
    return { code, message }
};


export const deleteAssetAction = (id) => async (dispatch) => {
    
    await dispatch({type: DELETE_ASSETS_LOADING});

    const url = `/assets/delete_asset`;
    const { code, message, summary } = await deleteRequest(url, id);

    if(code !== 200) 
    {
        await dispatch({type: DELETE_ASSETS_FAILURE, payload: message});
        return { code, message }
    }
        
    await dispatch({type: DELETE_ASSETS_SUCCESS, payload: { id, summary }});
    return { code, message }
};
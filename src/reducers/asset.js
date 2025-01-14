import { 
    DELETE_ASSETS_FAILURE, 
    DELETE_ASSETS_LOADING, 
    DELETE_ASSETS_SUCCESS, 
    GET_ASSETS_FAILURE, 
    GET_ASSETS_LOADING, 
    GET_ASSETS_SUCCESS, 
    NEW_ASSET_FAILURE, 
    NEW_ASSET_LOADING, 
    NEW_ASSET_SUCCESS,
    EDIT_ASSET_SUCCESS,
    EDIT_ASSET_FAILURE,
    EDIT_ASSET_LOADING,
} from "../action/assets";

const initialState = {
    assets: [], 
    summary: {},
    error: null,
    loading: false,
};


export const assetsReducer = (state = initialState, action) => {
    switch (action.type) 
    {

        case DELETE_ASSETS_LOADING: 
        case EDIT_ASSET_LOADING: 
        case GET_ASSETS_LOADING: 
        case NEW_ASSET_LOADING: 
            return {
                ...state,
                error: null,
                loading: true
            };

        case NEW_ASSET_SUCCESS: 
        return {
            ...state,
            assets: [...state.assets, action.payload.asset],
            summary: action.payload.summary,
            error: null,
            loading: false
        };

        case GET_ASSETS_SUCCESS: {

            const { assets, summary } = action.payload;
            return {
                ...state,
                assets,
                summary,
                error: null,
                loading: false
            }
        };

        case EDIT_ASSET_SUCCESS: {

            const { asset, summary } = action.payload;

            const clone = [...state.assets];
            const cloneSummary = {...state.summary};
            
            const index = clone.findIndex((item) => item._id === asset._id);

            if(index !== -1)
            {
                clone[index] = asset;
            }

            return {
                ...state,
                assets: clone,
                summary: summary || cloneSummary,
                error: null,
                loading: false
            }
        };

        case DELETE_ASSETS_SUCCESS: {

            const { summary } = action.payload;
            const assets = state.assets.filter(asset => asset._id !== action.payload.id);

            return {
                ...state,
                assets,
                summary,
                error: null,
                loading: false
            }
        };

        case DELETE_ASSETS_FAILURE: 
        case EDIT_ASSET_FAILURE: 
        case GET_ASSETS_FAILURE: 
        case NEW_ASSET_FAILURE: 
            return {
                ...state,
                error: action.payload,
                loading: false
            };
            

        default: return state;
    }
};

import { LOGIN_LOADING, LOGIN_SUCCESS, REGISTER_SUCCESS, REGISTER_FAILURE, LOGIN_FAILURE, REGISTER_LOADING } from "../action/users";

const initialState = {
    users: [],
    user: {
        _id: '',
        username: '',
        email: '',
        role: '',
        createAt: '',
        updatedAt: '',
    },
    error: null,
    loading: false,
};

export const userReducer = (state = initialState, action) => {
    switch (action.type) 
    {
        case LOGIN_LOADING:
        case REGISTER_LOADING:
            return {
                ...state,
                loading: true,
                error: null,
            };

        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            return {
                ...state,
                user: action.payload,
                loading: false,
                error: null,
            };

        case LOGIN_FAILURE:
        case REGISTER_FAILURE:
            return {
                ...state,
                error: action.payload,
                loading: false,
            };
        default: return state;
    }
};

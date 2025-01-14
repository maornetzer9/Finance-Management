import { combineReducers } from 'redux';
import { userReducer } from './user';
import { assetsReducer } from './asset';
import { investmentReducer } from './investment';
import { transactionsReducer } from './transactions';



export const rootReducer = combineReducers({
    userReducer,
    assetsReducer,
    investmentReducer,
    transactionsReducer
});


import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

const uiReducer = (state = { isLoading: true, theme: 'dark' }, action) => {
    switch (action.type) {
        case 'LOADING/SET':
            return {
                ...state,
                isLoading: action.payload
            } 
        case 'THEME/TOGGLE':
            return {
                ...state,
                theme: state.theme === 'light' ? 'dark' : 'light',
            }       
        default: 
            return state;
    }
}
const initialUserState = { 
    isAuth: false, 
    token: localStorage.getItem('token'), 
    user: null 
};

const userReducer = (state = initialUserState, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                isAuth: true,
                token: action.payload,
            }   
        case 'LOGOUT':
            return {
                ...state,
                isAuth: false,
            }  
        case 'CURRENT_USER_SET':
            return {
                ...state,
                isAuth: true,
                user: action.payload,
            }
        case 'CURRENT_USER_UPDATE':
            return {
                ...state,
                isAuth: true,
                user: action.payload,
            }                   
        default: 
            return state;
    }
}

const rootReducer = combineReducers({
    user: userReducer,
    ui: uiReducer,
})

const middlewares = applyMiddleware(
    thunk,
    logger,
)

const store = createStore(rootReducer, middlewares);

export default store;

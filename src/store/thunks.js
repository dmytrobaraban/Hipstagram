import { actionTypes } from "./actionTypes";
import api from '../services/api';
import { toast } from 'react-toastify';

export const initThunk = () => {
    return async dispatch => {
        try {
            const currentUser = await api.currentUser();
            dispatch({type: 'CURRENT_USER_SET', payload: currentUser});
        } catch(err) {
            dispatch({type: actionTypes.LOGOUT});
        } finally {
            dispatch({
                type: 'LOADING/SET',
                payload: false,
            });
        }
    };
}

export const loginThunk = (data) => {
    return async dispatch => {
        try {
            const { access_token } = await api.login(data);
            dispatch({type: actionTypes.LOGIN, payload: access_token});
            localStorage.setItem('token', access_token);
            dispatch(initThunk());
        } catch(err) {
            dispatch({type: actionTypes.LOGOUT});
        } finally {
            dispatch({
                type: 'LOADING/SET',
                payload: false,
            });
        }
    }
}

export const updateCurrentUserThunk = (data) => {
    return async (dispatch, getState) => {
        try {
            const updatedUser = await api.updateCurrentUser(data);
            dispatch({type: 'CURRENT_USER_UPDATE', payload: updatedUser})
            toast.success('User has been updated!', {theme: getState().ui.theme})
        } catch(err) {
            const { data } = err.response;
            toast.error(data, {theme: getState().ui.theme})
        }
    }
}

export const updatePasswordThunk = (data) => {
    return async (dispatch, getState) => {
        try {
            const updatedUserPassword = await api.updatePassword(data);
            dispatch({
              type: 'CURRENT_USER_UPDATE',
              payload: updatedUserPassword,
            });
            toast.success('Password has been updated!', {theme: getState().ui.theme})
        } catch(err) {
            const { data } = err.response;
            toast.error(data, {theme: getState().ui.theme})
        }
    }
}

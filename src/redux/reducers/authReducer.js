import {
    LOGIN_SUCCESS,
    LOGIN_ERROR,
    SIGNUP_SUCCESS,
    SIGNUP_ERROR,
    SIGNOUT_SUCCESS,
} from '../actions/types';

const INITIAL_STATE = {
    authError: null
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOGIN_ERROR:
            return { ...state, authError: 'Login failed' };
        case LOGIN_SUCCESS:
            return { ...state, authError: null };
        case SIGNOUT_SUCCESS:
            return state;
        case SIGNUP_SUCCESS:
            return { ...state, authError: null };
        case SIGNUP_ERROR:
            return { ...state, authError: action.err.message };
        default:
            return state;
    }
};
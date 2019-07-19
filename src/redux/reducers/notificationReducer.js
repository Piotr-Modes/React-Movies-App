import {
    ADD_NOTIFICATION_ADD_TO_WATCH_LIST,
    ADD_NOTIFICATION_AVOID_DUPLICATES,
    ADD_NOTIFICATION_LOGIN_SUCCESS,
    ADD_NOTIFICATION_SIGNUP_SUCCESS,
    ADD_NOTIFICATION_REMOVED_FROM_WATCH_LIST
} from '../actions/types';

const INITIAL_STATE = {
    message: '',
    id: ''
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ADD_NOTIFICATION_ADD_TO_WATCH_LIST:
            return {
                ...state,
                message: `Added "${action.payload.movieTitle}" to your Watchlist!`,
                id: action.payload.id
            };
        case ADD_NOTIFICATION_AVOID_DUPLICATES:
            return {
                ...state,
                message: `You already have "${action.payload.movieTitle}" in your Watchlist.`,
                id: action.payload.id
            };
        case ADD_NOTIFICATION_SIGNUP_SUCCESS:
            return {
                ...state,
                message: `${action.payload.userName}, Welcome to React Movies!`,
                id: action.payload.id
            };
        case ADD_NOTIFICATION_LOGIN_SUCCESS:
            return {
                ...state,
                message: `You have successfully logged in!`,
                id: action.payload.id
            };
        case ADD_NOTIFICATION_REMOVED_FROM_WATCH_LIST:
            return {
                ...state,
                message: `"${action.payload.movieTitle}" removed from Watchlist.`,
                id: action.payload.id
            };
        default:
            return state;
    }
};
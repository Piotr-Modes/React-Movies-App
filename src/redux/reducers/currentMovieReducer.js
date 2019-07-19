import {
    FETCH_MOVIE_DETAILS,
    RESET_CURRENT_MOVIE
    // FETCH_MOVIE_DETAILS_REQUESTED,
    // FETCH_MOVIE_DETAILS_SUCCESS,
    // FETCH_MOVIE_DETAILS_FAILED
} from '../actions/types';

export default (state = {}, action) => {
    switch (action.type) {
        default:
            return state;
        // case CREATE_STREAM:
        //     return { ...state, [action.payload.id]: action.payload };
        // case FETCH_STREAM:
        //     return { ...state, [action.payload.id]: action.payload };
        case RESET_CURRENT_MOVIE:
            return {};
        case FETCH_MOVIE_DETAILS:
            return { ...action.payload };
    }
};
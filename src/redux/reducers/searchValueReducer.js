import {
    UPDATE_SEARCH_VALUE
} from '../actions/types';

export default (state = '', action) => {
    switch (action.type) {
        default:
            return state;
        case UPDATE_SEARCH_VALUE:
            return action.payload
    }
};
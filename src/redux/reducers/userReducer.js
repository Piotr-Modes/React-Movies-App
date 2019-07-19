import {
    ADD_TO_WATCH_LIST,
    REMOVE_FROM_WATCH_LIST,
} from '../actions/types';

const initialState = {
    watchList: [],
}

export default (state = initialState, action) => {
    switch (action.type) {
        default:
            return state;
        case ADD_TO_WATCH_LIST:
            return { ...state, watchList: [...state.watchList, action.payload] };
        case REMOVE_FROM_WATCH_LIST:
            return { ...state, watchList: state.watchList.filter(id => id !== action.payload) };
    }
};
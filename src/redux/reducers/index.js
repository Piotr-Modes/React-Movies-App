import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';
import authReducer from './authReducer';
import moviesReducer from './moviesReducer';
import searchValueReducer from './searchValueReducer';
import currentMovieReducer from './currentMovieReducer';
import userReducer from './userReducer';
import notificationReducer from './notificationReducer';

export default combineReducers({
    firestore: firestoreReducer,
    firebase: firebaseReducer,
    auth: authReducer,
    form: formReducer,
    movies: moviesReducer,
    user: userReducer,
    currentMovie: currentMovieReducer,
    searchValue: searchValueReducer,
    notification: notificationReducer
});
// Action Creators
import TMDB from '../../apis/TMDB';
import {
    LOGIN_SUCCESS,
    LOGIN_ERROR,
    SIGNUP_SUCCESS,
    SIGNUP_ERROR,
    SIGNOUT_SUCCESS,
    SIGNOUT_ERROR,
    UPDATE_SEARCH_VALUE,
    FETCH_SEARCHED_MOVIES,
    FETCH_MOVIE_DETAILS,
    SET_CURRENT_PAGE_NUMBER,
    FETCH_MOVIES_REQUESTED,
    FETCH_MOVIES_SUCCESS,
    FETCH_MOVIES_FAILED,
    ADD_TO_WATCH_LIST,
    ADD_TO_WATCH_LIST_ERROR,
    REMOVE_FROM_WATCH_LIST,
    REMOVE_FROM_WATCH_LIST_ERROR,
    RESET_CURRENT_MOVIE,
    RESET_MAIN_MOVIE_LIST,
    ADD_NOTIFICATION_ADD_TO_WATCH_LIST,
    ADD_NOTIFICATION_AVOID_DUPLICATES,
    ADD_NOTIFICATION_LOGIN_SUCCESS,
    ADD_NOTIFICATION_SIGNUP_SUCCESS,
    ADD_NOTIFICATION_REMOVED_FROM_WATCH_LIST,
} from './types';
import history from '../../history';
import { getUrlParams, generateUUID } from '../../helperFunctions';
import env from '../../config/env';

export const resetMainMovieList = () => {
    return {
        type: RESET_MAIN_MOVIE_LIST
    }
}
export const resetCurrentMovie = () => {
    return {
        type: RESET_CURRENT_MOVIE
    }
}

export const addToWatchList = movie => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        // make async call to database
        const firestore = getFirestore();
        const firebase = getFirebase();
        const state = getState();

        console.log(firestore.collection('users').doc(state.firebase.auth.uid).collection('myWatchList').get())

        let isInWatchList = false;

        firestore.collection('users').doc(state.firebase.auth.uid).collection('myWatchList').get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                // console.log(doc.id, " => ", doc.data().movie.id);
                // console.log(movie.id)

                if (doc.data().movie.id === movie.id) {
                    isInWatchList = true;
                }
            });
        }).then(() => {
            if (!isInWatchList) {
                firestore.collection('users').doc(state.firebase.auth.uid).collection('myWatchList').add({
                    movie: movie,
                    userId: state.firebase.auth.uid
                }).then(() => {
                    dispatch({ type: ADD_TO_WATCH_LIST });
                    dispatch({
                        type: ADD_NOTIFICATION_ADD_TO_WATCH_LIST,
                        payload: { movieTitle: movie.title, id: generateUUID() }
                    });
                }).catch(err => {
                    dispatch({ type: ADD_TO_WATCH_LIST_ERROR }, err);
                });
            } else {
                dispatch({
                    type: ADD_NOTIFICATION_AVOID_DUPLICATES,
                    payload: { movieTitle: movie.title, id: generateUUID() }
                });
            }
        })
    }
};

export const removeFromWatchList = (docId, movieTitle) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        // make async call to database
        const firestore = getFirestore();
        //const firebase = getFirebase();
        const state = getState();

        firestore.collection('users').doc(state.firebase.auth.uid).collection('myWatchList').doc(docId).delete(
        ).then(() => {
            dispatch({ type: REMOVE_FROM_WATCH_LIST });
            dispatch({
                type: ADD_NOTIFICATION_REMOVED_FROM_WATCH_LIST,
                payload: { movieTitle: movieTitle, id: generateUUID() }
            });
        }).catch(err => {
            dispatch({ type: REMOVE_FROM_WATCH_LIST_ERROR }, err);
        });
    }
};

export const signIn = (credentials) => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();

        firebase.auth().signInWithEmailAndPassword(
            credentials.email,
            credentials.password
        ).then(() => {
            dispatch({ type: LOGIN_SUCCESS })
            dispatch({
                type: ADD_NOTIFICATION_LOGIN_SUCCESS,
                payload: { id: generateUUID() }
            });
        }).catch((err) => {
            dispatch({ type: LOGIN_ERROR, err })
        })
    }
};

export const signOut = () => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();

        firebase.auth().signOut().then(() => {
            dispatch({ type: SIGNOUT_SUCCESS });
        })
    }
};

export const signUp = (newUser) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();
        const firestore = getFirestore();

        firebase.auth().createUserWithEmailAndPassword(
            newUser.email,
            newUser.password
        ).then((resp) => {
            return firestore.collection('users').doc(resp.user.uid).set({
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                initials: newUser.firstName[0] + newUser.lastName[0]
            })
        }).then(() => {
            dispatch({ type: SIGNUP_SUCCESS });
            dispatch({
                type: ADD_NOTIFICATION_SIGNUP_SUCCESS,
                payload: { userName: `${newUser.firstName} ${newUser.lastName}`, id: generateUUID() }
            });
        }).catch(err => {
            dispatch({ type: SIGNUP_ERROR, err });
        })
    }
};

export const fetchMoviesRequested = data => {
    return {
        type: FETCH_MOVIES_REQUESTED,
        payload: data
    };
}

export const fetchMoviesSuccess = data => {
    return {
        type: FETCH_MOVIES_SUCCESS,
        payload: data
    };
}

export const fetchMoviesFailed = data => {
    return {
        type: FETCH_MOVIES_FAILED,
        payload: data
    };
}

export const fetchMovies = (litstType = 'top_rated', listName = 'mainMovieList') => async dispatch => {
    dispatch(fetchMoviesRequested({ listName: listName }))
    try {
        const response = await TMDB.get(`/movie/${litstType}?api_key=${env.API_KEY}&language=en-US&page=${getUrlParams().get('page') || 1}`);
        dispatch(fetchMoviesSuccess({ response: response.data, listName: listName }))
    } catch (err) {
        dispatch(fetchMoviesFailed({ listName: listName }))
    }
};

export const fetchSearchedMovies = (listName = 'mainMovieList') => async dispatch => {
    dispatch(fetchMoviesRequested({ listName: listName }))
    try {
        const response = await TMDB.get(`/search/movie?api_key=${env.API_KEY}&language=en-US&query=${getUrlParams().get('term')}&page=${getUrlParams().get('page')}`);
        dispatch(fetchMoviesSuccess({ response: response.data, listName: listName }))
    } catch (err) {
        dispatch(fetchMoviesFailed({ listName: listName }))
    }
};

export const fetchFilteredMovies = (listName = 'mainMovieList') => async dispatch => {
    dispatch(fetchMoviesRequested({ listName: listName }))
    try {
        const response = await TMDB.get(`/discover/movie?api_key=${env.API_KEY}&language=en-US&${getUrlParams().toString()}`);
        dispatch(fetchMoviesSuccess({ response: response.data, listName: listName }))
    } catch (err) {
        dispatch(fetchMoviesFailed({ listName: listName }))
    }
};

export const fetchMovieDetails = movieId => async dispatch => {
    const response = await TMDB.get(`/movie/${movieId}?api_key=${env.API_KEY}&language=en-US&append_to_response=videos,credits`);
    dispatch({
        type: FETCH_MOVIE_DETAILS,
        payload: response.data
    });
};

export const updateSearchValue = value => {
    return {
        type: UPDATE_SEARCH_VALUE,
        payload: value
    };
};

export const setCurrentPageNumber = pageNumber => {
    return {
        type: SET_CURRENT_PAGE_NUMBER,
        payload: parseInt(pageNumber, 10)
    };
};
//to delate
export const handleSearchValueSubmit = (value, pageNumber = 1) => async dispatch => {
    const response = await TMDB.get(`/search/movie?api_key=${env.API_KEY}&language=en-US&query=${value}&page=${pageNumber}`);
    dispatch({
        type: FETCH_SEARCHED_MOVIES,
        payload: response.data
    });
};

// export const movieListFetchManager = () => 
// {
//     const params = getUrlParams();
//     const path = window.location.pathname;

//     if (path.indexOf('search') !== -1)
//     {
//         fetchSearchedMovies()
//         console.log('search')
//     }
//     if (path.indexOf('filtered') !== -1)
//     {
//         console.log('filtered')
//     }
//     if (path.indexOf('top_rated') !== -1)
//     {
//         console.log('top_rated')
//     }
// }

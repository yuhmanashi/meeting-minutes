import * as Util from '../utils/util';
import * as sessionErrorActions from './session_errors';


const RECEIVE_ALL_WATCHLISTS = 'RECEIVE_ALL_WATCHLISTS';
const RECEIVE_WATCHLIST = 'RECEIVE_WATCHLIST';
const REMOVE_WATCHLIST = 'REMOVE_WATCHLIST';

const receiveAllWatchlists = watchlists => ({
    type: RECEIVE_ALL_WATCHLISTS,
    payload: watchlists
})

const receiveWatchlist = watchlist => ({
    type: RECEIVE_WATCHLIST,
    payload: watchlist
})

const removeWatchlist = watchlistId => ({
    type: REMOVE_WATCHLIST,
    payload: watchlistId
})

export const fetchWatchlists = () => async dispatch => {
    const response = await fetch("/api/watchlists", {
        method: "GET",
        headers: Util.headers()
    })
    const data = await response.json();
    dispatch(receiveAllWatchlists(data.watchlists));
    return response;
};

export const fetchWatchlist = (id) => async dispatch => {
    const response = await fetch(`/api/watchlists/${id}`, {
        method: "GET",
        headers: Util.headers()
    })
    const data = await response.json();
    dispatch(receiveWatchlist(data.watchlist))
    return response;
};

export const createWatchlist = (watchlist) => async dispatch => {
    const { userId, studentId, tag } = watchlist;
    const response = await fetch("/api/watchlists", {
        method: "POST",
        body: JSON.stringify({
            userId, studentId, tag
        }),
        headers: Util.headers()
    })
    const data = await response.json();
    if (data.errors) dispatch(sessionErrorActions.setSessionErrors(data.errors))
    dispatch(receiveWatchlist(data.watchlist));
    return response;
};

export const updateWatchlist = (watchlist) => async dispatch => {
    const { userId, studentId, tag } = watchlist;
    const response = await fetch(`/api/watchlists/${watchlist.id}`, {
        method: "PATCH",
        body: JSON.stringify({
            userId, studentId, tag
        }),
        headers: Util.headers()
    })
    const data = await response.json();
    dispatch(receiveWatchlist(data.watchlist));
    if (data.errors) dispatch(sessionErrorActions.setSessionErrors(data.errors))
    return response;
};

export const deleteWatchlist = (id) => async dispatch => {
    const response = await fetch(`/api/watchlists/${id}`, {
        method: "DELETE",
        headers: Util.headers()
    })
    dispatch(removeWatchlist(id));
    return response;
};

const watchlistsReducer = (state = {}, action) => {
    Object.freeze(state);
    const nextState = Object.assign({}, state);

    switch (action.type) {
        case RECEIVE_ALL_WATCHLISTS:
            return action.payload;
        case RECEIVE_WATCHLIST:
            if (action.payload) nextState[action.payload.id] = action.payload
            return nextState;
        case REMOVE_WATCHLIST:
            delete nextState[action.payload]
            return nextState;
        default:
            return state;
    }
};

export default watchlistsReducer;
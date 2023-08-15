import * as Util from '../utils/util';
import * as sessionErrorActions from './session_errors';

const RECEIVE_ALL_PINS = 'RECEIVE_ALL_PINS';
const RECEIVE_PIN = 'RECEIVE_PIN';
const REMOVE_PIN = 'REMOVE_PIN';

const receiveAllPins = (pins = {}) => ({
    type: RECEIVE_ALL_PINS,
    payload: pins
})

const receivePin = pin => ({
    type: RECEIVE_PIN,
    payload: pin
})

const removePin = pinId => ({
    type: REMOVE_PIN,
    payload: pinId
})

export const fetchPins = () => async dispatch => {
    const response = await fetch("/api/pins", {
        method: "GET",
        headers: Util.headers()
    })
    const data = await response.json();
    dispatch(receiveAllPins(data.pins));
    return response;
};

export const fetchPin = (id) => async dispatch => {
    const response = await fetch(`/api/pins/${id}`, {
        method: "GET",
        headers: Util.headers()
    })
    const data = await response.json();
    dispatch(receivePin(data.pin))
    return response;
};

export const createPin = (pin) => async dispatch => {
    const { authorId, title, body } = pin;
    const response = await fetch("/api/pins", {
        method: "POST",
        body: JSON.stringify({
            authorId, title, body
        }),
        headers: Util.headers()
    })
    const data = await response.json();
    if (data.errors) dispatch(sessionErrorActions.setSessionErrors(data.errors))
    dispatch(receivePin(data.pin));
    return response;
};

export const updatePin = (pin) => async dispatch => {
    const { authorId, title, body, id } = pin;
    const response = await fetch(`/api/pins/${id}`, {
        method: "PATCH",
        body: JSON.stringify({
            authorId, title, body
        }),
        headers: Util.headers()
    })
    const data = await response.json();
    dispatch(receivePin(data.pin));
    if (data.errors) dispatch(sessionErrorActions.setSessionErrors(data.errors))
    return response;
};

export const deletePin = (id) => async dispatch => {
    const response = await fetch(`/api/pins/${id}`, {
        method: "DELETE",
        headers: Util.headers()
    })
    dispatch(removePin(id));
    return response;
};

const pinsReducer = (state = {}, action) => {
    Object.freeze(state);
    const nextState = Object.assign({}, state);

    switch (action.type) {
        case RECEIVE_ALL_PINS:
            return action.payload;
        case RECEIVE_PIN:
            if (action.payload) nextState[action.payload.id] = action.payload
            return nextState;
        case REMOVE_PIN:
            delete nextState[action.payload]
            return nextState;
        default:
            return state;
    }
};

export default pinsReducer;
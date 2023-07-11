import * as Util from '../utils/util';
import * as sessionErrorActions from './session_errors';


const RECEIVE_ALL_MEETINGS = 'RECEIVE_ALL_MEETINGS';
const RECEIVE_MEETING = 'RECEIVE_MEETING';
const REMOVE_MEETING = 'REMOVE_MEETING';

const receiveAllMeetings = meetings => ({
    type: RECEIVE_ALL_MEETINGS,
    payload: meetings
})

const receiveMeeting = meeting => ({
    type: RECEIVE_MEETING,
    payload: meeting
})

const removeMeeting = meetingId => ({
    type: REMOVE_MEETING,
    payload: meetingId
})

export const fetchMeetings = () => async dispatch => {
    const response = await fetch("/api/meetings", {
        method: "GET",
        headers: Util.headers()
    })
    const data = await response.json();
    dispatch(receiveAllMeetings(data.meetings));
    return response;
};

export const fetchMeeting = (id) => async dispatch => {
    const response = await fetch(`/api/meetings/${id}`, {
        method: "GET",
        headers: Util.headers()
    })
    const data = await response.json();
    dispatch(receiveMeeting(data.meeting))
    return response;
};

export const createMeeting = (meeting) => async dispatch => {
    const { userId, category, name, problems, notes, email } = meeting;
    const response = await fetch("/api/meetings", {
        method: "POST",
        body: JSON.stringify({
            userId, category, name, problems, notes, email
        }),
        headers: Util.headers()
    })
    const data = await response.json();
    if (data.errors) dispatch(sessionErrorActions.setSessionErrors(data.errors))
    dispatch(receiveMeeting(data.meeting));
    return response;
};

export const updateMeeting = (meeting) => async dispatch => {
    const { userId, category, name, problems, notes, email } = meeting;
    const response = await fetch(`/api/meetings/${meeting.id}`, {
        method: "PATCH",
        body: JSON.stringify({
            userId, category, name, problems, notes, email
        }),
        headers: Util.headers()
    })
    const data = await response.json();
    dispatch(receiveMeeting(data.meeting));
    if (data.errors) dispatch(sessionErrorActions.setSessionErrors(data.errors))
    return response;
};

export const deleteMeeting = (id) => async dispatch => {
    const response = await fetch(`/api/meetings/${id}`, {
        method: "DELETE",
        headers: Util.headers()
    })
    dispatch(removeMeeting(id));
    return response;
};

const meetingsReducer = (state = {}, action) => {
    Object.freeze(state);
    const nextState = Object.assign({}, state);

    switch (action.type) {
        case RECEIVE_ALL_MEETINGS:
            return action.payload;
        case RECEIVE_MEETING:
            if (action.payload) nextState[action.payload.id] = action.payload
            return nextState;
        case REMOVE_MEETING:
            delete nextState[action.payload]
            return nextState;
        default:
            return state;
    }
};

export default meetingsReducer;
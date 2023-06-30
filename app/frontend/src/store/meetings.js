import * as Util from '../utils/util';

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
    const response = await fetch(`/api/meeting/${id}`, {
        method: "GET",
        headers: Util.headers()
    })
    const data = await response.json();
    dispatch(receiveMeeting(data.meeting))
    return response;
};

export const createMeeting = (meeting) => async dispatch => {
    const { category, student, problem, notes, studentEmail } = meeting;
    const response = await fetch("/api/meetings", {
        method: "POST",
        body: JSON.stringify({
            category, student, problem, notes, studentEmail
        }),
        headers: Util.headers()
    })
    const data = await response.json();
    dispatch(receiveMeeting(data.meeting));
    return response;
};

export const updateMeeting = (meeting) => async dispatch => {
    const { category, student, problem, notes, studentEmail } = meeting;
    const response = await fetch(`/api/meeting/${meeting.id}`, {
        method: "PATCH",
        body: JSON.stringify({
            category, student, problem, notes, studentEmail 
        }),
        headers: Util.headers()
    })
    const data = await response.json();
    dispatch(receiveMeeting(data.meeting));
    return response;
};

export const deleteMeeting = (id) => async dispatch => {
    const response = await fetch(`/api/meeting/${id}`, {
        method: "DELETE",
        headers: Util.headers()
    })
    dispatch(removeMeeting());
    return response;
};

const initialState = '';

const meetingsReducer = (state = [], action) => {
    switch (action.type) {
        case RECEIVE_ALL_MEETINGS:
            return action.payload;
        case RECEIVE_MEETING:
            return action.payload;
        case REMOVE_MEETING:
            return [];
        default:
            return state;
    }
};

export default meetingsReducer;
import * as Util from '../utils/util';

const RECEIVE_ALL_STUDENTS = 'RECEIVE_ALL_STUDENTS';
const RECEIVE_STUDENT = 'RECEIVE_STUDENT';
const REMOVE_STUDENT = 'REMOVE_STUDENT';

const receiveAllStudents = students => ({
    type: RECEIVE_ALL_STUDENTS,
    payload: students
})

const receiveStudent = student => ({
    type: RECEIVE_STUDENT,
    payload: student
})

const removeStudent = studentId => ({
    type: REMOVE_STUDENT,
    payload: studentId
})

export const fetchStudents = () => async dispatch => {
    const response = await fetch("/api/students", {
        method: "GET",
        headers: Util.headers()
    })
    const data = await response.json();
    dispatch(receiveAllStudents(data.students));
    return response;
};

export const fetchStudent = (id) => async dispatch => {
    const response = await fetch(`/api/students/${id}`, {
        method: "GET",
        headers: Util.headers()
    })
    const data = await response.json();
    dispatch(receiveStudent(data.student))
    return response;
};

export const createStudent = (student) => async dispatch => {
    const { userId, category, name, problems, notes, email } = student;
    const response = await fetch("/api/students", {
        method: "POST",
        body: JSON.stringify({
            userId, category, name, problems, notes, email
        }),
        headers: Util.headers()
    })
    const data = await response.json();
    dispatch(receiveStudent(data.student));
    return response;
};

export const updateStudent = (student) => async dispatch => {
    const { userId, category, name, problems, notes, email } = student;
    const response = await fetch(`/api/students/${student.id}`, {
        method: "PATCH",
        body: JSON.stringify({
            userId, category, name, problems, notes, email
        }),
        headers: Util.headers()
    })
    const data = await response.json();
    dispatch(receiveStudent(data.student));
    return response;
};

export const deleteStudent = (id) => async dispatch => {
    const response = await fetch(`/api/students/${id}`, {
        method: "DELETE",
        headers: Util.headers()
    })
    dispatch(removeStudent(id));
    return response;
};

const studentsReducer = (state = {}, action) => {
    Object.freeze(state);
    const nextState = Object.assign({}, state);

    switch (action.type) {
        case RECEIVE_ALL_STUDENTS:
            return action.payload;
        case RECEIVE_STUDENT:
            if (action.payload) nextState[action.payload.id] = action.payload
            return nextState;
        case REMOVE_STUDENT:
            delete nextState[action.payload]
            return nextState;
        default:
            return state;
    }
};

export default studentsReducer;
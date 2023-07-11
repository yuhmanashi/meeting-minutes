import * as Util from '../utils/util';

const SET_SESSION_ERRORS = 'session/setSessionErrors';
const REMOVE_SESSION_ERRORS = 'session/removeSessionErrors';

export const setSessionErrors = (errors) => {
  return {
    type: SET_SESSION_ERRORS,
    payload: errors
  };
};

export const removeSessionErrors = () => {
  return {
    type: REMOVE_SESSION_ERRORS
  };
};

export const sessionErrorReducer = (state = [], action) => {
  switch (action.type) {
    case SET_SESSION_ERRORS:
      return action.payload;
    case REMOVE_SESSION_ERRORS:
      return [];
    default:
      return state;
  }
};
export const login = ({ email, password }) => async dispatch => {
  const response = await fetch("/api/session", {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: Util.headers()
  });
  const data = await response.json();
  console.log('in login', data);
  storeCurrentUser(data.user);
  dispatch(setCurrentUser(data.user))
    .then(() => {return response});
  // return response;
};

export const signup = (user) => async (dispatch) => {
  const { firstName, lastName, email, password } = user;
  const response = await fetch("/api/users", {
    method: "POST",
    body: JSON.stringify({
      firstName, 
      lastName,
      email,
      password
    }),
    headers: Util.headers()
  });
  const data = await response.json();
  storeCurrentUser(data.user);
  dispatch(setCurrentUser(data.user));
  return response;
};

export const logout = () => async (dispatch) => {
  const response = await fetch("/api/session", {
    method: "DELETE",
    headers: Util.headers()
  });
  storeCurrentUser(null);
  dispatch(removeCurrentUser());
  return response;
};
import { loadUserProjects } from "./project";
import { loadUserSections } from "./section";
import { loadUserTasks } from "./task";

const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';

const setUser = (user) => ({
  type: SET_USER,
  payload: user
});

const removeUser = () => ({
  type: REMOVE_USER
});

export const thunkAuthenticate = () => async (dispatch) => {
	const response = await fetch("/api/auth/");
	if (response.ok) {
    const data = await response.json();

    const user = {
      id: data.id,
      email: data.email,
      username: data.username,
      first_name: data.first_name,
      last_name: data.last_name,
    }
		if (data.errors) {
			return;
		}

		await dispatch(setUser(user));
    await dispatch(loadUserProjects(data.projects))
    await dispatch(loadUserSections(data.sections))
    await dispatch(loadUserTasks(data.tasks))
	}
};

export const thunkLogin = (credentials) => async dispatch => {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials)
  });

  if(response.ok) {
    const data = await response.json();

    const user = {
      id: data.id,
      email: data.email,
      username: data.username,
      first_name: data.first_name,
      last_name: data.last_name,
    }

    await dispatch(setUser(user));
    await dispatch(loadUserProjects(data.projects))
    await dispatch(loadUserSections(data.sections))
    await dispatch(loadUserTasks(data.tasks))
    
  } else if (response.status < 500) {
    const errorMessages = await response.json();
    return errorMessages
  } else {
    return { server: "Something went wrong. Please try again" }
  }
};

export const thunkSignup = (user) => async (dispatch) => {
  const response = await fetch("/api/auth/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user)
  });

  if(response.ok) {
    const data = await response.json();
    dispatch(setUser(data));
  } else if (response.status < 500) {
    const errorMessages = await response.json();
    return errorMessages
  } else {
    return { server: "Something went wrong. Please try again" }
  }
};

export const thunkLogout = () => async (dispatch) => {
  await fetch("/api/auth/logout");
  dispatch(removeUser());
};

const initialState = { user: null };

function sessionReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };
    case REMOVE_USER:
      return { ...state, user: null };
    default:
      return state;
  }
}

export default sessionReducer;

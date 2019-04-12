import axios from "axios";
import { SET_CURRENT_USER, SET_AUTH_TYPE } from "./../actionTypes";

export const loginUser = data => async dispatch => {
  try {
    const res = await axios.post("/api/login", data);
    dispatch({ type: SET_CURRENT_USER, payload: res.data });
  } catch (err) {
    return err.response;
  }
};

export const logoutUser = () => async dispatch => {
  await axios.get("/api/logout");
  dispatch({ type: SET_CURRENT_USER, payload: false });
};

export const registerUser = data => async dispatch => {
  try {
    const res = await axios.post("/api/register", data);
    dispatch({ type: SET_CURRENT_USER, payload: res.data });
  } catch (err) {
    return err.response;
  }
};

export const setAuthType = type => async dispatch => {
  dispatch({ type: SET_AUTH_TYPE, payload: type });
};

export const getSession = () => async dispatch => {
  const res = await axios.get("/api/session");
  dispatch({ type: SET_CURRENT_USER, payload: res.data });
};

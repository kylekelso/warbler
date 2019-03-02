import axios from "axios";
import { SET_PROFILE_VIEW } from "../actionTypes";

export const setView = username => async dispatch => {
  const res = await axios.get(`/api/${username}`);
  dispatch({ type: SET_PROFILE_VIEW, payload: res.data });
};

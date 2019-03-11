import axios from "axios";
import _ from "lodash";
import {
  SET_PROFILE_VIEW,
  SET_SEARCH_RESULTS,
  SET_CURRENT_USER
} from "../actionTypes";

export const setView = username => async dispatch => {
  const res = await axios.get(`/api/${username}`);
  dispatch({ type: SET_PROFILE_VIEW, payload: res.data });
};

export const searchUsers = search => dispatch => {
  _apiSearch(search, dispatch);
};

const _apiSearch = _.debounce(async (search, dispatch) => {
  const res = await axios.get("/api/users", {
    params: { search }
  });
  await dispatch({ type: SET_SEARCH_RESULTS, payload: res.data });
}, 500);

export const updateUser = (username, data) => async dispatch => {
  try {
    const res = await axios.put(`/api/${username}`, data);
    dispatch({ type: SET_CURRENT_USER, payload: res.data });
  } catch (err) {
    return err.response;
  }
};

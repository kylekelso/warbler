import axios from "axios";
import { GET_POSTS, ADD_POST, DELETE_POST, RESET_LOADER } from "../actionTypes";

export const getPosts = (user_id, page = 0) => async dispatch => {
  const res = await axios.get(`/api/${user_id}/posts`, {
    params: { page }
  });
  dispatch({ type: GET_POSTS, payload: res.data });
};

export const addPost = data => async dispatch => {
  const res = await axios.post("/api/user/posts", data);
  dispatch({ type: ADD_POST, payload: res.data });
};

export const deletePost = post_id => async dispatch => {
  const { status } = await axios.delete(`/api/user/posts/${post_id}`);
  dispatch({ type: DELETE_POST, payload: { status, post_id } });
};

export const resetLoader = () => dispatch => {
  dispatch({ type: RESET_LOADER });
};

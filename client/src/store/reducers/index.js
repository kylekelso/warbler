import { combineReducers } from "redux";
import authReducer from "./authentication";
import postReducer from "./post";
import viewReducer from "./view";

export default combineReducers({
  auth: authReducer,
  post: postReducer,
  view: viewReducer
});

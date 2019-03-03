import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import authReducer from "./authentication";
import postReducer from "./post";
import viewReducer from "./view";

export default combineReducers({
  form: formReducer,
  auth: authReducer,
  post: postReducer,
  view: viewReducer
});

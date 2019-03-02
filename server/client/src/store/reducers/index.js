import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import authReducer from "./authentication";
import viewReducer from "./view";

export default combineReducers({
  auth: authReducer,
  form: formReducer,
  view: viewReducer
});

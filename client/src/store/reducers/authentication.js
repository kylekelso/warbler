import { SET_CURRENT_USER, SET_AUTH_TYPE } from "./../actionTypes";

const DEFAULT_STATE = {
  isAuthenticated: null,
  authType: "login",
  user: {}
};

export default function(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case SET_AUTH_TYPE:
      return { ...state, authType: action.payload };
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !!Object.keys(action.payload).length,
        user: { ...state.user, ...action.payload }
      };
    default:
      return state;
  }
}

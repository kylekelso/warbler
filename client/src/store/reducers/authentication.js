import { SET_CURRENT_USER } from "./../actionTypes";

const DEFAULT_STATE = {
  isAuthenticated: null,
  user: {}
};

export default function(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        isAuthenticated: !!Object.keys(action.payload).length,
        user: { ...state.user, ...action.payload }
      };
    default:
      return state;
  }
}

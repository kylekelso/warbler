import { SET_CURRENT_USER, SET_PROFILE_VIEW } from "../actionTypes";

const DEFAULT_STATE = {
  id: null,
  username: null,
  profileImgUrl: null,
  userExists: null
};

export default function(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return { ...action.payload };
    case SET_PROFILE_VIEW:
      if (action.payload) {
        return { ...action.payload, userExists: true };
      }
      return { ...action.payload, userExists: false };
    default:
      return state;
  }
}

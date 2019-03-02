import { SET_CURRENT_USER, SET_PROFILE_VIEW } from "../actionTypes";

const DEFAULT_STATE = {
  id: null,
  username: null,
  profileImgUrl: null
};

export default function(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return { ...action.payload };
    case SET_PROFILE_VIEW:
      return { ...action.payload };
    default:
      return state;
  }
}

import {
  SET_CURRENT_USER,
  SET_PROFILE_VIEW,
  SET_SEARCH_RESULTS
} from "../actionTypes";

const DEFAULT_STATE = {
  id: null,
  username: null,
  profileImgUrl: null,
  userExists: null,
  searchResults: []
};

export default function(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      if (action.payload) {
        return { ...state, ...action.payload };
      }
      return DEFAULT_STATE;
    case SET_PROFILE_VIEW:
      if (action.payload) {
        return { ...state, ...action.payload, userExists: true };
      }
      return { ...state, ...action.payload, userExists: false };
    case SET_SEARCH_RESULTS:
      return { ...state, searchResults: action.payload };
    default:
      return state;
  }
}

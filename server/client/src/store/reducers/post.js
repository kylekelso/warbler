import {
  GET_POSTS,
  ADD_POST,
  DELETE_POST,
  VALIDATE_TAG,
  RESET_LOADER
} from "./../actionTypes";

const DEFAULT_STATE = {
  list: [],
  isValidTag: true,
  loaded: false
};

export default function(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case RESET_LOADER:
      return { ...state, loaded: false };
    case GET_POSTS:
      return { ...state, list: [...action.payload], loaded: true };
    case ADD_POST:
      return {
        ...state,
        list: [action.payload, ...state.list],
        loaded: true
      };
    case DELETE_POST:
      return {
        ...state,
        list: state.list.filter(post => post._id !== action.payload.post_id),
        loaded: true
      };
    case VALIDATE_TAG:
      return { ...state, isValidTag: !!action.payload, loaded: true };
    default:
      return state;
  }
}

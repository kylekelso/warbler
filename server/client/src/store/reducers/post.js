import {
  GET_POSTS,
  ADD_POST,
  DELETE_POST,
  VALIDATE_TAG
} from "./../actionTypes";

const DEFAULT_STATE = {
  list: [],
  isValidTag: true
};

export default function(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case GET_POSTS:
      return { ...state, list: [...action.payload] };
    case ADD_POST:
      return {
        ...state,
        list: [action.payload, ...state.list]
      };
    case DELETE_POST:
      return {
        ...state,
        list: state.list.filter(post => post._id !== action.payload.post_id)
      };
    case VALIDATE_TAG:
      return { ...state, isValidTag: !!action.payload };
    default:
      return state;
  }
}

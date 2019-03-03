import {
  GET_POSTS,
  ADD_POST,
  DELETE_POST,
  VALIDATE_TAG,
  REQUEST
} from "./../actionTypes";

const DEFAULT_STATE = {
  list: [],
  isValidTag: true,
  isFetching: null
};

export default function(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case REQUEST:
      return { ...state, isFetching: true };
    case GET_POSTS:
      return { ...state, list: [...action.payload], isFetching: false };
    case ADD_POST:
      return {
        ...state,
        list: [action.payload, ...state.list],

        isFetching: false
      };
    case DELETE_POST:
      return {
        ...state,
        list: state.list.filter(post => post._id !== action.payload.post_id),

        isFetching: false
      };
    case VALIDATE_TAG:
      return { ...state, isValidTag: !!action.payload, isFetching: false };
    default:
      return state;
  }
}

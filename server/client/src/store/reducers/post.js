import { GET_POSTS, ADD_POST, DELETE_POST } from "./../actionTypes";

const DEFAULT_STATE = {
  list: [],
  isValidTag: true
};

export default function(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case GET_POSTS:
      return { list: [...action.payload] };
    case ADD_POST:
      return {
        list: [action.payload, ...state.list]
      };
    case DELETE_POST:
      return {
        list: state.list.filter(post => post._id !== action.payload.post_id)
      };
    default:
      return state;
  }
}

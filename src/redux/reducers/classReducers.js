import { GET_CLASS_LIST_FAILED, GET_CLASS_LIST_SUCCEEDED } from "../types";

const INITIAL_STATE = {
  classList: [],
};

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_CLASS_LIST_SUCCEEDED:
      return { ...state, classList: action.payload };
    case GET_CLASS_LIST_FAILED:
      return { ...state, error: action.payload };
    default:
      return state;
  }
}

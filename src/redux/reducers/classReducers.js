import { GET_CLASS_LIST_FAILED, GET_CLASS_LIST_SUCCEEDED } from "../types";

const initialState = {
  classList: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_CLASS_LIST_SUCCEEDED:
      return { ...state, classList: action.payload };
    case GET_CLASS_LIST_FAILED:
      return { ...state, error: action.payload };
    default:
      return state;
  }
}

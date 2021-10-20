import { classActionTypes } from "../types";

const initialState = {
  classList: [],
  error: null,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case classActionTypes.GET_CLASS_LIST_SUCCEEDED:
      return { ...state, classList: action.payload };
    case classActionTypes.GET_CLASS_LIST_FAILED:
      return { ...state, error: action.payload };
    default:
      return state;
  }
}

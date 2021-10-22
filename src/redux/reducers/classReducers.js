import { GET_CLASS_LIST } from "../types";

const INITIAL_STATE = {
  classList: [],
  definition: null,
};

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_CLASS_LIST:
      return { ...state, classList: action.payload };
    default:
      return state;
  }
}

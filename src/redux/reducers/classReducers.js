import { GET_CLASS_LIST } from "../types";

const INITIAL_STATE = {
  classList: [],
};

export default function ClassReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_CLASS_LIST:
      console.log('dff',action.payload)
      return { ...state, classList: action.payload };
    default:
      return state;
  }
}

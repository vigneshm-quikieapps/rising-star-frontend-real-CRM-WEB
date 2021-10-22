import { GET_CLASS_DEFINITION } from "../types";

const INITIAL_STATE = {
  definition: null,
};

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_CLASS_DEFINITION:
        return { ...state, definition: action.payload };
    default:
      return state;
  }
}

import { memberActionTypes } from "../types";

const INITIAL_STATE = {
  classList: [],
};

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case memberActionTypes.GET_ALL_MEMBERS:
      return { ...state, allMembers: action.payload };
    default:
      return state;
  }
}

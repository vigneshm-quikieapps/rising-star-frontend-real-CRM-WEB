import { EDIT_TERM, EDIT_TERM_ITEM, GET_TERM, UPDATE_TERM } from "../types";

const INITIAL_STATE = {
  getTerm: [],
  editTermItem: [],
  updatedTerm: [],

};

export default function TermReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_TERM:
    case EDIT_TERM:
      return { ...state, getTerm: action.payload };
    case EDIT_TERM_ITEM:
      return { ...state, editTermItem: action.payload };
    case UPDATE_TERM:
      return { ...state, updatedTerm: action.payload };
    default:
      return state;
  }
}

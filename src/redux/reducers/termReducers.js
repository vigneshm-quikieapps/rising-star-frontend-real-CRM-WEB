import {
  DELETE_EDIT_TERM,
  EDIT_TERM,
  EDIT_TERM_ITEM,
  GET_TERM,
  GET_TERM_BUSINESSID,
  UPDATE_TERM,
} from "../types";

const INITIAL_STATE = {
  getTerm: [],
  editTermItem: [],
  updatedTerm: [],
  currentBusinessId: "",
};

export default function TermReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_TERM:
    case EDIT_TERM:
    case DELETE_EDIT_TERM:
      return { ...state, getTerm: action.payload };
    case GET_TERM_BUSINESSID:
      return { ...state, currentBusinessId: action.payload };
    case EDIT_TERM_ITEM:
      return { ...state, editTermItem: action.payload };
    case UPDATE_TERM:
      return { ...state, updatedTerm: action.payload };
    default:
      return state;
  }
}

import { termsActionTypes } from "../types";

const INITIAL_STATE = {
  allTerms: null,
  termSessions: null,
};

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case termsActionTypes.GET_ALL_TERMS:
      return { ...state, allTerms: action.payload };
    case termsActionTypes.GET_ALL_SESSIONS_OF_A_TERM:
      return { ...state, termSessions: action.payload };

    default:
      return state;
  }
}
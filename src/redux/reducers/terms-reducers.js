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
    case termsActionTypes.GET_TERMS_OF_A_BUSINESS_SUCCEEDED: {
      return { ...state, allTerms: action.payload, loading: false };
    }
    case termsActionTypes.GET_TERMS_OF_A_BUSINESS_FAILED: {
      return { ...state, error: action.payload, loading: false };
    }
    default:
      return state;
  }
}

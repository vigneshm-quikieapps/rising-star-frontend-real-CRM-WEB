import { termsActionTypes } from "../types";

const INITIAL_STATE = {
  allTerms: [],
  termSessions: [],
  termsOfBusiness: [],
};

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case termsActionTypes.GET_ALL_TERMS:
      return { ...state, allTerms: action.payload };
    case termsActionTypes.GET_ALL_SESSIONS_OF_A_TERM:
      return { ...state, termSessions: action.payload };
    case termsActionTypes.GET_TERMS_OF_A_BUSINESS_SUCCEEDED: {
      const { docs, page: currentPage, totalPages } = action.payload;
      return {
        ...state,
        termsOfBusiness: docs,
        currentPage,
        totalPages,
        loading: false,
      };
    }
    case termsActionTypes.GET_TERMS_OF_A_BUSINESS_FAILED: {
      return { ...state, error: action.payload, loading: false };
    }
    case termsActionTypes.ADD_NEW_TERM_SUCCEEDED: {
      const updatedTerms = [...state.allTerms, action.payload];
      return { ...state, allTerms: updatedTerms, loading: false };
    }
    case termsActionTypes.ADD_NEW_TERM_FAILED: {
      return { ...state, error: action.payload, loading: false };
    }
    case termsActionTypes.EDIT_TERM_SUCCEEDED: {
      const updatedTerm = action.payload;
      const updatedTermList = state.allTerms.map((term) => {
        if (term._id !== updatedTerm.id) return term;
        return updatedTerm;
      });
      return { ...state, allTerms: updatedTermList, loading: false };
    }
    case termsActionTypes.EDIT_TERM_FAILED: {
      return { ...state, error: action.payload, loading: false };
    }
    default:
      return state;
  }
}

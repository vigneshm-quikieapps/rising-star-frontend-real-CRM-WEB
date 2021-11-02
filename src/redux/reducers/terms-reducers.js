import { termsActionTypes } from "../types";

const INITIAL_STATE = {
  allTerms: [],
  termSessions: [],
  termsOfBusiness: [],
  termsOfClass: [],
  currentBusinessId: undefined,
  currentPage: 0,
  totalPages: 0,
};

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case termsActionTypes.GET_ALL_TERMS_SUCCEEDED:
      return { ...state, allTerms: action.payload };
    case termsActionTypes.GET_TERMS_OF_A_BUSINESS_SUCCEEDED: {
      const {
        docs,
        businessId,
        page: currentPage,
        totalPages,
      } = action.payload;
      return {
        ...state,
        termsOfBusiness: docs,
        currentBusinessId: businessId,
        currentPage,
        totalPages,
      };
    }
    case termsActionTypes.ADD_NEW_TERM_SUCCEEDED: {
      const updatedTerm = action.payload;
      const { businessId } = updatedTerm;
      const updatedTermsOfBusiness =
        businessId === state.currentBusinessId
          ? [...state.termsOfBusiness, updatedTerm]
          : [...state.termsOfBusiness];
      const updatedTermList = [...state.allTerms, updatedTerm];
      return {
        ...state,
        allTerms: updatedTermList,
        termsOfBusiness: updatedTermsOfBusiness,
      };
    }
    case termsActionTypes.EDIT_TERM_SUCCEEDED: {
      const updatedTerm = action.payload;
      const updatedTermList = state.allTerms.map((term) => {
        if (term._id !== updatedTerm._id) return term;
        return updatedTerm;
      });
      const updatedTermsOfBusiness = state.termsOfBusiness.map((term) => {
        if (term._id !== updatedTerm._id) return term;
        return updatedTerm;
      });
      return {
        ...state,
        allTerms: updatedTermList,
        termsOfBusiness: updatedTermsOfBusiness,
      };
    }
    case termsActionTypes.DELETE_TERM_SUCCEEDED: {
      const deletedTermId = action.payload;
      const updatedTermList = state.allTerms.filter(
        (term) => term._id !== deletedTermId
      );
      const updatedTermsOfBusiness = state.termsOfBusiness.filter(
        (term) => term._id !== deletedTermId
      );
      return {
        ...state,
        allTerms: updatedTermList,
        termsOfBusiness: updatedTermsOfBusiness,
      };
    }

    case termsActionTypes.GET_TERMS_OF_CLASS_SUCCEEDED: {
      const { terms } = action.payload;
      return {
        ...state,
        termsOfClass: terms,
      };
    }

    default:
      return state;
  }
}

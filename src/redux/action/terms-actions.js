import { termsActionTypes } from "../types";

export const getAllTerms = () => {
  return {
    type: termsActionTypes.GET_ALL_TERMS_SAGA,
  };
};

export const getSessionsByTermId = (id) => {
  return {
    type: termsActionTypes.GET_ALL_SESSIONS_OF_A_TERM_SAGA,
    payload: id,
  };
};

export const getTermsOfBusiness = (businessId) => {
  return {
    type: termsActionTypes.GET_TERMS_OF_A_BUSINESS,
    payload: businessId,
  };
};

export const addTerm = (termData) => {
  return { type: termsActionTypes.ADD_NEW_TERM, payload: termData };
};

export const editTerm = (termData) => {
  return { type: termsActionTypes.EDIT_TERM, payload: termData };
};

export const deleteTerm = (termId) => {
  return { type: termsActionTypes.DELETE_TERM, payload: termId };
};

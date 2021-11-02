import { termsActionTypes } from "../types";

export const getAllTerms = () => {
  return {
    type: termsActionTypes.GET_ALL_TERMS,
  };
};

export const getTermsOfBusiness = (businessId, params) => {
  return {
    type: termsActionTypes.GET_TERMS_OF_A_BUSINESS,
    payload: { businessId, params },
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

export const getTermsOfClass = (id) => {
  return { type: termsActionTypes.GET_TERMS_OF_CLASS, payload: id };
};

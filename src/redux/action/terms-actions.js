import { termsActionTypes } from "../types";

export const getAllTerms = () => {
  return {
    type: termsActionTypes.GET_ALL_TERMS,
  };
};

export const getSessionsByTermId = (id) => {
  return {
    type: termsActionTypes.GET_ALL_SESSIONS_OF_A_TERM,
    payload: id,
  };
};

export const getTermsOfBusiness = (businessId) => {
  return {
    type: termsActionTypes.GET_TERMS_OF_A_BUSINESS,
    payload: businessId,
  };
};

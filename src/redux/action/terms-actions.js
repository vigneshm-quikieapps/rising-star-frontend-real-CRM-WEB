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

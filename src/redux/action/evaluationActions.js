import { evaluationsActionTypes } from "../types";

export const getEvaluationSchemeList = () => {
  return {
    type: evaluationsActionTypes.GET_EVALUATION_SCHEME,
  };
};

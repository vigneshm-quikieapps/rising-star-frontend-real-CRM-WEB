import { businessesActionTypes } from "../types";

export const getBusinessList = () => {
  return { type: businessesActionTypes.GET_BUSINESSES };
};

export const getBusinessListOfBusiness = () => {
  return { type: businessesActionTypes.GET_BUSINESSES_OF_BUSINESS };
};

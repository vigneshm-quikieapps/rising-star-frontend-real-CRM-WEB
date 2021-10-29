import { businessesActionTypes } from "../types";

export const getBusinessList = () => {
  return { type: businessesActionTypes.GET_BUSINESSES };
};

export const getBusinessListOfBusiness = () => {
  return { type: businessesActionTypes.GET_BUSINESSES_OF_BUSINESS };
};

export const getCategoriesOfBusiness = (id) => {
  return {
    type: businessesActionTypes.GET_CATEGORIES_OF_BUSINESS,
    payload: id,
  };
};

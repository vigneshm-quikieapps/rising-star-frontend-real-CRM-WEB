import { businessesActionTypes } from "../types";

export const getBusinessList = () => {
  return { type: businessesActionTypes.GET_BUSINESSES };
};

export const getCategoriesOfBusiness = (id) => {
  return {
    type: businessesActionTypes.GET_CATEGORIES_OF_BUSINESS,
    payload: id,
  };
};

export const getCoachesOfBusiness = (id) => {
  return {
    type: businessesActionTypes.GET_COACHES_OF_BUSINESS,
    payload: id,
  };
};

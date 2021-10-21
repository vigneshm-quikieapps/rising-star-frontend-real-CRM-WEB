import { businessesActionTypes } from "../types";

export const getBusinessList = () => {
  return {
    type: businessesActionTypes.GET_BUSINESSES,
  };
};

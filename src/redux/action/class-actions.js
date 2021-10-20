import { classActionTypes } from "../types";

export const getClassList = (id) => {
  return { type: classActionTypes.GET_CLASS_LIST, payload: id };
};

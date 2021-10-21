import { classActionTypes } from "../types";

export const getClassList = (params) => {
  return { type: classActionTypes.GET_CLASS_LIST, payload: params };
};

export const deleteClass = (id) => {
  return { type: classActionTypes.DELETE_CLASS, payload: id };
};

import { classActionTypes } from "../types";

export const getClassList = (id) => {
  return { type: classActionTypes.GET_CLASS_LIST, payload: id };
};

export const deleteClass = (id) => {
  return { type: classActionTypes.DELETE_CLASS, payload: id };
};

import { classActionTypes } from "../types";

export const getClassList = (id) => {
  return { type: classActionTypes.GET_CLASS_LIST, payload: id };
};

export const deleteClass = (id) => {
  return { type: classActionTypes.DELETE_CLASS, payload: id };
};

export const getClassById = (id) => {
  return { type: classActionTypes.GET_CLASS_BY_ID_SAGA, payload: id };
};

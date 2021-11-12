import { classActionTypes } from "../types";

export const getClassList = (params) => {
  return { type: classActionTypes.GET_CLASS_LIST, payload: params };
};

export const deleteClass = (id) => {
  return { type: classActionTypes.DELETE_CLASS, payload: id };
};

export const getClassById = (id) => {
  return { type: classActionTypes.GET_CLASS_BY_ID, payload: id };
};

export const addClass = (data) => {
  return { type: classActionTypes.ADD_CLASS, payload: data };
};

export const getSessionsOfClass = (classId) => ({
  type: classActionTypes.GET_CLASS_SESSIONS,
  payload: classId,
});

export const editClass = (data) => {
  return { type: classActionTypes.EDIT_CLASS, payload: data };
};

export const editSessionOfClass = (data) => {
  return {
    type: classActionTypes.UPDATE_SESSION_OF_CLASS,
    payload: data,
  };
};

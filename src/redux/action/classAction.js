import { GET_CLASS_LIST } from "../types";

export const getClassList = (id) => {
  return { type: GET_CLASS_LIST, payload: id };
};

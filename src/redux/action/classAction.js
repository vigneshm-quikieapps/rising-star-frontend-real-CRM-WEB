import { GET_CLASS_LIST_SAGA } from "../types";

export const getClassList = (id) => {
  return { type: GET_CLASS_LIST_SAGA, payload: id };
};

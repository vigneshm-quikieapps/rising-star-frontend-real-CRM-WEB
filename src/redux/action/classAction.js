import { GET_CLASS_LIST_SAGA } from "../types";

export const GetClassList = (id) => {
  console.log('getClassList')
  return { type: GET_CLASS_LIST_SAGA, payload: id };
};
export default {
  GetClassList
};


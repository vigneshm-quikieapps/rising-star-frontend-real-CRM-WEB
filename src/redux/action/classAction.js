import { GET_CLASS_LIST_SAGA } from "../types";

const getClassList = () => {
  return { type: GET_CLASS_LIST_SAGA };
};

export default {
  getClassList,
};

import { GET_ALL_MEMBERS_SAGA, GET_MEMBER_BY_ID_SAGA } from "../types";

export const getAllMembersList = () => {
  return { type: GET_ALL_MEMBERS_SAGA };
};

export const getMemberById = (id) => {
  return { type: GET_MEMBER_BY_ID_SAGA, payload: id };
};

import { memberActionTypes } from "../types";

export const getAllMembersList = () => {
  return { type: memberActionTypes.GET_ALL_MEMBERS_SAGA };
};

export const getMemberById = (id) => {
  return { type: memberActionTypes.GET_MEMBER_BY_ID_SAGA, payload: id };
};

export const getMemberEnrolmentList = (params) => {
  return {
    type: memberActionTypes.GET_MEMBERS_ENROLLMENT_SAGA,
    payload: params,
  };
};

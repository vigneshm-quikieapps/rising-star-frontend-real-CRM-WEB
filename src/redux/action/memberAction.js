import { memberActionTypes } from "../types";

export const getAllMembersList = (params) => {
  return { type: memberActionTypes.GET_ALL_MEMBERS, payload: params };
};

export const getMemberById = (id) => {
  return { type: memberActionTypes.GET_MEMBER_BY_ID_SAGA, payload: id };
};

export const getMemberEnrolmentList = (params) => {
  return {
    type: memberActionTypes.GET_MEMBERS_ENROLLMENT,
    payload: params,
  };
};

export const getMemberProgressRecord = (params) => {
  return {
    type: memberActionTypes.GET_MEMBER_PROGRESS_RECORD,
    payload: params,
  };
};

export const updateMultipleStatusOnMemberProgressRecord = (params) => {
  return {
    type: memberActionTypes.UPDATE_MULTIPLE_STATUS_MEMBER_PROGRESS_RECORD,
    payload: params,
  };
};

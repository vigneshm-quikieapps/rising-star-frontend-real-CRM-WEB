import { memberActionTypes } from "../types";

export const getAllMembersList = (params) => {
  return { type: memberActionTypes.GET_ALL_MEMBERS, payload: params };
};

export const getMemberById = (id) => {
  return { type: memberActionTypes.GET_MEMBER_BY_ID, payload: id };
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

export const getMemberConsentRecord = (id) => {
  return {
    type: memberActionTypes.CONSENT_RECORD_OF_MEMBER,
    payload: id,
  };
};

export const getMembersOfSession = (sessionId, params) => {
  return {
    type: memberActionTypes.GET_MEMBERS_OF_SESSION,
    payload: { sessionId, params },
  };
};

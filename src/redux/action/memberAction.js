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

export const memberEnrolmentDropped = (id) => {
  return {
    type: memberActionTypes.MEMBER_ENROLMENT_DROPPED,
    payload: id,
  };
};

export const memberEnrolmentSuspend = (id) => {
  return {
    type: memberActionTypes.MEMBER_ENROLMENT_SUSPEND_SUCCEEDED,
    payload: id,
  };
};

export const memberEnrolmentReturnFromSuspend = (id) => {
  return {
    type: memberActionTypes.MEMBER_ENROLMENT_RETURN_FROM_SUSPEND,
    payload: id,
  };
};

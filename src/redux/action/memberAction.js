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
    type: memberActionTypes.GET_MEMBER_PROGRESS_RECORD_SAGA,
    payload: params,
  };
};

export const updateMemberProgressRecord = (params) => {
  return {
    type: memberActionTypes.UPDATE_MEMBER_PROGRESS_RECORD_SAGA,
    payload: params,
  };
};

export const memberEnrolmentDropped = (id) => {
  return {
    type: memberActionTypes.MEMBER_ENROLMENT_DROPPED_SAGA,
    payload: id,
  };
};

export const memberEnrolmentSuspend = (id) => {
  return {
    type: memberActionTypes.MEMBER_ENROLMENT_SUSPEND,
    payload: id,
  };
};

export const memberEnrolmentReturnFromSuspend = (id) => {
  return {
    type: memberActionTypes.MEMBER_ENROLMENT_RETURN_FROM_SUSPEND_SAGA,
    payload: id,
  };
};

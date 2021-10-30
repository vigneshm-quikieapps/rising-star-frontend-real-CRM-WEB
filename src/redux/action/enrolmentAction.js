import { enrolmentActionTypes } from "../types";

export const memberEnrolmentDropped = (id) => {
  return {
    type: enrolmentActionTypes.MEMBER_ENROLMENT_DROPPED,
    payload: id,
  };
};

export const memberEnrolmentSuspend = (id) => {
  return {
    type: enrolmentActionTypes.MEMBER_ENROLMENT_SUSPEND,
    payload: id,
  };
};

export const memberEnrolmentReturnFromSuspend = (id) => {
  return {
    type: enrolmentActionTypes.MEMBER_ENROLMENT_RETURN_FROM_SUSPEND,
    payload: id,
  };
};

export const transferEnrolment = (params) => {
  return {
    type: enrolmentActionTypes.TRANSFER_MEMBER_ENROLMENT,
    payload: params,
  };
};

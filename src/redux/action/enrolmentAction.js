import { enrolmentActionTypes } from "../types";

export const memberEnrolmentDrop = (id) => {
  return {
    type: enrolmentActionTypes.MEMBER_ENROLMENT_DROP,
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

export const transferEnrolment = (enrolmentId, newSessionId) => {
  return {
    type: enrolmentActionTypes.TRANSFER_MEMBER_ENROLMENT,
    payload: { enrolmentId, newSessionId },
  };
};

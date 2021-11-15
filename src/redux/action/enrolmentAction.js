import { enrolmentActionTypes } from "../types";

export const memberEnrolmentDrop = (id) => {
  return {
    type: enrolmentActionTypes.DROP,
    payload: id,
  };
};

export const memberEnrolmentSuspend = (id) => {
  return {
    type: enrolmentActionTypes.SUSPEND,
    payload: id,
  };
};

export const memberEnrolmentReturnFromSuspend = (id) => {
  return {
    type: enrolmentActionTypes.RETURN_FROM_SUSPEND,
    payload: id,
  };
};

export const transferEnrolment = (enrolmentId, newSessionId, sessionList) => {
  return {
    type: enrolmentActionTypes.TRANSFER,
    payload: { enrolmentId, newSessionId, sessionList },
  };
};

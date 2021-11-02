import { sessionActionTypes } from "../types";

export const getAllMembersEnrolledInASession = (id) => {
  return {
    type: sessionActionTypes.GET_ALL_MEMBERS_ENROLLED_IN_A_SESSION,
    payload: id,
  };
};

export const getSessionsByTermId = (id) => {
  return {
    type: sessionActionTypes.GET_ALL_SESSIONS_OF_A_TERM,
    payload: id,
  };
};

export const getSessionInAclassByTermId = (params) => {
  return {
    type: sessionActionTypes.GET_ALL_SESSION_OF_A_CLASS_BY_TERM,
    payload: params,
  };
};

export const getAttendanceOfSessionByDate = (params) => {
  return {
    type: sessionActionTypes.GET_ATTENDANCE_OF_SESSION_BY_DATE,
    payload: params,
  };
};

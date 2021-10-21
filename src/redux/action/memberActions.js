import { GET_MEMBERS_ENROLLMENT_SAGA } from "../types";

export const getMemberEnrolmentList = (params) => {
  return {
    type: GET_MEMBERS_ENROLLMENT_SAGA,
    payload: params,
  };
};

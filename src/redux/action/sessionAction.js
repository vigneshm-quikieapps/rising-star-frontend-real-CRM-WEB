import { memberActionTypes } from "../types";

export const getAllMembersEnrolledInASession = (id) => {
  console.log(id);
  return {
    type: memberActionTypes.GET_ALL_MEMBERS_ENROLLED_IN_A_SESSION_SAGA,
    payload: id,
  };
};

import { GET_ALL_MEMBERS_ENROLLED_IN_A_SESSION_SAGA } from "../types";

export const getAllMembersEnrolledInASession = (id) => {
  console.log(id);
  return { type: GET_ALL_MEMBERS_ENROLLED_IN_A_SESSION_SAGA, payload: id };
};

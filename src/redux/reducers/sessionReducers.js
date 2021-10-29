import { sessionActionTypes } from "../types";

const INITIAL_STATE = {
  allMembersEnrolled: [],
  sessionsOfTerm: null,
  sessionListInAclassByterm: [],
};

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case sessionActionTypes.GET_ALL_MEMBERS_ENROLLED_IN_A_SESSION:
      return { ...state, allMembersEnrolled: action.payload };
    case sessionActionTypes.GET_ALL_SESSIONS_OF_A_TERM_SUCCEEDED:
      return { ...state, sessionsOfTerm: action.payload };
    case sessionActionTypes.GET_ALL_SESSION_OF_A_CLASS_BY_TERM_SUCCEEDED:
      return { ...state, sessionListInAclassByterm: action.payload };
    default:
      return state;
  }
}

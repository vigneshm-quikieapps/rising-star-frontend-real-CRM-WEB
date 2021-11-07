import { sessionActionTypes } from "../types";

const INITIAL_STATE = {
  allMembersEnrolled: [],
  sessionsOfTerm: [],
  sessionsOfClassInTerm: [],
  attendanceList: { attendance: {} },
  currentPage: 1,
  totalPages: 1,
};

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case sessionActionTypes.GET_ALL_MEMBERS_ENROLLED_IN_A_SESSION:
      return { ...state, allMembersEnrolled: action.payload };
    case sessionActionTypes.GET_ALL_SESSIONS_OF_A_TERM_SUCCEEDED:
      const { page: currentPage, totalPages, docs } = action.payload;
      return { ...state, sessionsOfTerm: docs, currentPage, totalPages };
    case sessionActionTypes.GET_ALL_SESSION_OF_A_CLASS_BY_TERM_SUCCEEDED:
      return { ...state, sessionsOfClassInTerm: action.payload };
    case sessionActionTypes.GET_ATTENDANCE_OF_SESSION_BY_DATE_SUCCEEDED:
      return { ...state, attendanceList: action.payload };
    default:
      return state;
  }
}

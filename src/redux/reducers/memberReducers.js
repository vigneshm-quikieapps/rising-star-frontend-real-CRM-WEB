import { memberActionTypes } from "../types";

const INITIAL_STATE = {
  memberList: [],
  membersOfSession: [],
  enrolmentList: [],
  progressRecord: {},
  consentRecord: {},
  currentMember: null,
  totalPages: 1,
  currentPage: 1,
};

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case memberActionTypes.GET_ALL_MEMBERS_SUCCEEDED: {
      const { memberList, totalPages, currentPage } = action.payload;
      return { ...state, memberList, totalPages, currentPage };
    }
    case memberActionTypes.GET_MEMBER_BY_ID_SUCCEEDED:
      return { ...state, currentMember: action.payload };
    case memberActionTypes.GET_MEMBERS_ENROLLMENT_SUCCEEDED:
      return { ...state, enrolmentList: action.payload };
    case memberActionTypes.GET_MEMBER_PROGRESS_RECORD_SUCCEEDED:
      return { ...state, progressRecord: action.payload };
    case memberActionTypes.CONSENT_RECORD_OF_MEMBER_SUCCEEDED:
      return { ...state, consentRecord: action.payload };
    case memberActionTypes.GET_MEMBERS_OF_SESSION_SUCCEEDED:
      const { totalPages, page, docs } = action.payload;
      return {
        ...state,
        membersOfSession: docs,
        totalPages,
        currentPage: page,
      };
    default:
      return state;
  }
}

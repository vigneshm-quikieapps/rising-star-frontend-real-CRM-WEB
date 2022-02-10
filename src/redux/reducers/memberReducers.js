import { memberActionTypes, enrolmentActionTypes } from "../types";

const INITIAL_STATE = {
  memberList: [],
  membersOfSession: [],
  enrolmentList: [],
  progressRecord: {},
  consentRecord: [],
  currentMember: null,
  totalPages: 1,
  currentPage: 1,
};

const enrolmentChangeHandler = (state, action, type) => {
  const { enrolmentId, newSessionId, sessionList } = action.payload;
  const enrolmentIndex = state.enrolmentList.findIndex(
    ({ _id }) => _id === enrolmentId,
  );
  const updatedEnrolment = { ...state.enrolmentList[enrolmentIndex] };
  switch (type) {
    case "transfer": {
      updatedEnrolment.sessionId = newSessionId;
      const sessionIndex = sessionList.findIndex(
        ({ _id }) => _id === newSessionId,
      );
      const newSession = { ...sessionList[sessionIndex] };
      updatedEnrolment.session = newSession;
      break;
    }
    case "drop": {
      updatedEnrolment.enrolledStatus = "DROPPED";
      break;
    }
    case "suspend": {
      updatedEnrolment.enrolledStatus = "SUSPEND";
      break;
    }
    case "return": {
      updatedEnrolment.enrolledStatus = "RETURN_FROM_SUSPENSION";
      break;
    }
    default:
      break;
  }
  const updatedList = [...state.enrolmentList];
  updatedList[enrolmentIndex] = updatedEnrolment;
  return { ...state, enrolmentList: updatedList };
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
    case enrolmentActionTypes.TRANSFER_SUCCEEDED: {
      // just for updating the state so the component will reload and dispatch
      // actions to get the new data
      return enrolmentChangeHandler(state, action, "transfer");
    }
    case enrolmentActionTypes.DROP_SUCCEEDED: {
      return enrolmentChangeHandler(state, action, "drop");
    }
    case enrolmentActionTypes.SUSPEND_SUCCEEDED: {
      return enrolmentChangeHandler(state, action, "suspend");
    }
    case enrolmentActionTypes.RETURN_FROM_SUSPEND_SUCCEEDED: {
      return enrolmentChangeHandler(state, action, "return");
    }
    default:
      return state;
  }
}

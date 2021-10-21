import { put, takeEvery, call } from "redux-saga/effects";
import { axiosGetMembersEnrolledInASession } from "../../services/sessionServices";
import {
  GET_ALL_MEMBERS_ENROLLED_IN_A_SESSION,
  GET_ALL_MEMBERS_ENROLLED_IN_A_SESSION_SAGA,
} from "../types";

export function* getMembersEnrolledInSession(action) {
  const member_list = yield call(
    axiosGetMembersEnrolledInASession,
    action.payload
  );
  yield put({
    type: GET_ALL_MEMBERS_ENROLLED_IN_A_SESSION,
    payload: member_list,
  });
}

export function* watchGetMemberEnrolledInSession() {
  yield takeEvery(
    GET_ALL_MEMBERS_ENROLLED_IN_A_SESSION_SAGA,
    getMembersEnrolledInSession
  );
}

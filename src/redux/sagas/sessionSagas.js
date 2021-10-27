import { put, takeEvery, call, all } from "redux-saga/effects";
import { axiosGetMembersEnrolledInASession } from "../../services/sessionServices";
import { axiosGetSessionsByTermId } from "../../services/term-services";
import { sessionActionTypes } from "../types";

export function* getMembersEnrolledInSession(action) {
  const member_list = yield call(
    axiosGetMembersEnrolledInASession,
    action.payload
  );
  yield put({
    type: sessionActionTypes.GET_ALL_MEMBERS_ENROLLED_IN_A_SESSION,
    payload: member_list,
  });
}

export function* watchGetMemberEnrolledInSession() {
  yield takeEvery(
    sessionActionTypes.GET_ALL_MEMBERS_ENROLLED_IN_A_SESSION_SAGA,
    getMembersEnrolledInSession
  );
}

export function* getSessionsByTermId(action) {
  try {
    const allTerms = yield call(axiosGetSessionsByTermId, action.payload);
    yield put({
      type: sessionActionTypes.GET_ALL_SESSIONS_OF_A_TERM_SUCCEEDED,
      payload: allTerms,
    });
  } catch (error) {
    yield put({
      type: sessionActionTypes.GET_ALL_SESSIONS_OF_A_TERM_FAILED,
      payload: error.message,
    });
  }
}

export function* watchGetSessionsByTermId() {
  yield takeEvery(
    sessionActionTypes.GET_ALL_SESSIONS_OF_A_TERM,
    getSessionsByTermId
  );
}

export default function* sessionSagas() {
  yield all([watchGetMemberEnrolledInSession(), watchGetSessionsByTermId()]);
}

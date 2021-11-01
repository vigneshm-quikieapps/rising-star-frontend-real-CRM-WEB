import { put, takeEvery, call, all } from "redux-saga/effects";
import {
  axiosGetMembersEnrolledInASession,
  axiosGetSessionInAclassByTermId,
} from "../../services/sessionServices";
import { axiosGetSessionsByTermId } from "../../services/term-services";
import { sessionActionTypes, sharedActionTypes } from "../types";

import { startLoading, stopLoading } from "../action/shared-actions";

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

export function* getSessionInAclassByTermId(action) {
  try {
    yield put(startLoading());
    const enrol_list = yield call(
      axiosGetSessionInAclassByTermId,
      action.payload
    );
    yield put({
      type: sessionActionTypes.GET_ALL_SESSION_OF_A_CLASS_BY_TERM_SUCCEEDED,
      payload: enrol_list,
    });
    yield put(stopLoading());
  } catch (error) {
    yield put({
      type: sharedActionTypes.SET_ERROR,
      payload:
        error?.response?.data?.message ||
        "Something went wrong while getting the session list of a class by term id.",
    });
  }
}

//watchingGeneratedFunction
export function* watchgetSessionInAclassByTermId() {
  yield takeEvery(
    sessionActionTypes.GET_ALL_SESSION_OF_A_CLASS_BY_TERM,
    getSessionInAclassByTermId
  );
}

export default function* sessionSagas() {
  yield all([
    watchGetMemberEnrolledInSession(),
    watchGetSessionsByTermId(),
    watchgetSessionInAclassByTermId(),
  ]);
}

import { put, takeEvery, call, all } from "redux-saga/effects";
import {
  axiosGetMembersEnrolledInASession,
  axiosGetSessionInAclassByTermId,
} from "../../services/sessionServices";
import { axiosGetSessionsByTermId } from "../../services/term-services";
import { sessionActionTypes, sharedActionTypes } from "../types";

import { startLoading, stopLoading } from "../action/shared-actions";

export function* getMembersEnrolledInSession(action) {
  try {
    yield put(startLoading());
    const member_list = yield call(
      axiosGetMembersEnrolledInASession,
      action.payload
    );
    yield put({
      type: sessionActionTypes.GET_ALL_MEMBERS_ENROLLED_IN_A_SESSION_SUCCEEDED,
      payload: member_list,
    });
    yield put(stopLoading());
  } catch (error) {
    yield put({
      type: sharedActionTypes.SET_ERROR,
      payload:
        error?.response?.data?.message ||
        "Something went wrong while getting members enrolled in a session",
    });
  }
}

export function* watchGetMemberEnrolledInSession() {
  yield takeEvery(
    sessionActionTypes.GET_ALL_MEMBERS_ENROLLED_IN_A_SESSION,
    getMembersEnrolledInSession
  );
}

export function* getSessionsByTermId(action) {
  try {
    yield put(startLoading());
    const allTerms = yield call(axiosGetSessionsByTermId, action.payload);
    yield put({
      type: sessionActionTypes.GET_ALL_SESSIONS_OF_A_TERM_SUCCEEDED,
      payload: allTerms,
    });
    yield put(stopLoading());
  } catch (error) {
    yield put({
      type: sharedActionTypes.SET_ERROR,
      payload:
        error?.response?.data?.message ||
        "Something went wrong while getting all sessions of  a term",
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

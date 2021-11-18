import { put, takeEvery, call, all } from "redux-saga/effects";
import {
  axiosGetMembersEnrolledInASession,
  getClassSessionsByTermId,
  getAttendanceListOfSessionByDate,
  addAttendance,
} from "../../services/sessionServices";
import { axiosGetSessionsByTermId } from "../../services/term-services";
import { sessionActionTypes } from "../types";

import { startLoading, stopLoading, setError } from "../action/shared-actions";

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
    yield put(
      setError(
        error,
        "Something went wrong while getting members enrolled in a session"
      )
    );
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
    yield put(
      setError(
        error,
        "Something went wrong while getting all sessions of  a term"
      )
    );
  }
}

export function* watchGetSessionsByTermId() {
  yield takeEvery(
    sessionActionTypes.GET_ALL_SESSIONS_OF_A_TERM,
    getSessionsByTermId
  );
}

export function* getClassSessionsByTerm(action) {
  try {
    yield put(startLoading());
    const enrol_list = yield call(getClassSessionsByTermId, action.payload);
    yield put({
      type: sessionActionTypes.GET_ALL_SESSION_OF_A_CLASS_BY_TERM_SUCCEEDED,
      payload: enrol_list,
    });
    yield put(stopLoading());
  } catch (error) {
    yield put(
      setError(
        error,
        "Something went wrong while getting the session list of a class by term id."
      )
    );
  }
}

//watchingGeneratedFunction
export function* watchGetClassSessionsByTerm() {
  yield takeEvery(
    sessionActionTypes.GET_ALL_SESSION_OF_A_CLASS_BY_TERM,
    getClassSessionsByTerm
  );
}

export function* getAttendanceOfSessionByDate(action) {
  try {
    yield put(startLoading());
    const attendanceList = yield call(
      getAttendanceListOfSessionByDate,
      action.payload
    );
    yield put({
      type: sessionActionTypes.GET_ATTENDANCE_OF_SESSION_BY_DATE_SUCCEEDED,
      payload: attendanceList,
    });
    yield put(stopLoading());
  } catch (error) {
    yield put(
      setError(
        error,
        "Something went wrong while getting the attendance list of a session by date."
      )
    );
  }
}

//watchingGeneratedFunction
export function* watchGetAttendanceOfSessionByDate() {
  yield takeEvery(
    sessionActionTypes.GET_ATTENDANCE_OF_SESSION_BY_DATE,
    getAttendanceOfSessionByDate
  );
}

export function* addAttendanceOnDate(action) {
  try {
    yield put(startLoading());
    yield call(addAttendance, action.payload.data);
    yield put({
      type: sessionActionTypes.ADD_ATTENDANCE_SUCCEEDED,
    });
    yield call(action.payload.callback);
    yield put(stopLoading());
  } catch (error) {
    yield put(
      setError(error, "Something went wrong while adding attendance on a date.")
    );
  }
}

//watchingGeneratedFunction
export function* watchAddAttendanceOnDate() {
  yield takeEvery(sessionActionTypes.ADD_ATTENDANCE, addAttendanceOnDate);
}

export default function* sessionSagas() {
  yield all([
    watchGetMemberEnrolledInSession(),
    watchGetSessionsByTermId(),
    watchGetClassSessionsByTerm(),
    watchGetAttendanceOfSessionByDate(),
    watchAddAttendanceOnDate(),
  ]);
}

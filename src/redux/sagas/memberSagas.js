import { put, takeEvery, takeLatest, call, all } from "redux-saga/effects";
import {
  getMembers,
  getMemberById,
  fetchgetAllErolmentOfAMember,
  fetchgetProgresRecordOfAMember,
  updateMulitpleStatusOnProgresRecordOfAMember,
  axiosGetConsentByClubmembership,
  getMemberListOfSession,
} from "../../services/memberServices";

import { startLoading, stopLoading, setError } from "../action/shared-actions";
import { memberActionTypes } from "../types";

export function* getMemberList(action) {
  try {
    yield put(startLoading());
    const state = yield call(getMembers, action.payload);
    yield put({
      type: memberActionTypes.GET_ALL_MEMBERS_SUCCEEDED,
      payload: state,
    });
    yield put(stopLoading());
  } catch (error) {
    yield put(
      setError(error, "Something went wrong while getting the member list"),
    );
  }
}

export function* watchGetMemberList() {
  yield takeLatest(memberActionTypes.GET_ALL_MEMBERS, getMemberList);
}

export function* getMember(action) {
  try {
    yield put(startLoading());
    const member = yield call(getMemberById, action.payload);
    yield put({
      type: memberActionTypes.GET_MEMBER_BY_ID_SUCCEEDED,
      payload: member,
    });
    yield put(stopLoading());
  } catch (error) {
    yield put(setError(error, "Something went wrong while getting the member"));
  }
}

export function* watchGetMember() {
  yield takeEvery(memberActionTypes.GET_MEMBER_BY_ID, getMember);
}

export function* getAllErolmentOfAMember(action) {
  try {
    yield put(startLoading());
    const enrol_list = yield call(fetchgetAllErolmentOfAMember, action.payload);
    yield put({
      type: memberActionTypes.GET_MEMBERS_ENROLLMENT_SUCCEEDED,
      payload: enrol_list,
    });
    yield put(stopLoading());
  } catch (error) {
    yield put(
      setError(
        error,
        "Something went wrong while getting the member enrolment list",
      ),
    );
  }
}

//watchingGeneratedFunction
export function* watchgetAllErolmentOfAMember() {
  yield takeEvery(
    memberActionTypes.GET_MEMBERS_ENROLLMENT,
    getAllErolmentOfAMember,
  );
}

export function* getProgresRecordOfAMember(action) {
  try {
    yield put(startLoading());
    const progressRecord = yield call(
      fetchgetProgresRecordOfAMember,
      action.payload,
    );
    yield put({
      type: memberActionTypes.GET_MEMBER_PROGRESS_RECORD_SUCCEEDED,
      payload: progressRecord,
    });
    yield put(stopLoading());
  } catch (error) {
    yield put(
      setError(
        error,
        "Something went wrong while getting the member progress record",
      ),
    );
  }
}

//watchingGeneratedFunction
export function* watchgetProgresRecordOfAMember() {
  yield takeEvery(
    memberActionTypes.GET_MEMBER_PROGRESS_RECORD,
    getProgresRecordOfAMember,
  );
}

export function* updateMulitpleStatusOnProgressRecordOfMember(action) {
  try {
    yield put(startLoading());
    yield call(updateMulitpleStatusOnProgresRecordOfAMember, action.payload);
    yield put({
      type: memberActionTypes.UPDATE_MULTIPLE_STATUS_MEMBER_PROGRESS_RECORD_SUCCEEDED,
    });
    yield put(stopLoading());
  } catch (error) {
    yield put(
      setError(
        error,
        "Something went wrong while updating the multiple status on progress record",
      ),
    );
  }
}

export function* watchupdateMulitpleStatusOnProgressRecordOfMember() {
  yield takeEvery(
    memberActionTypes.UPDATE_MULTIPLE_STATUS_MEMBER_PROGRESS_RECORD,
    updateMulitpleStatusOnProgressRecordOfMember,
  );
}

export function* getConsentRecordOfAMember(action) {
  try {
    yield put(startLoading());
    const consentRecord = yield call(
      axiosGetConsentByClubmembership,
      action.payload,
    );
    yield put({
      type: memberActionTypes.CONSENT_RECORD_OF_MEMBER_SUCCEEDED,
      payload: consentRecord,
    });
    yield put(stopLoading());
  } catch (error) {
    yield put(
      setError(
        error,
        "Something went wrong while getting the member consent record",
      ),
    );
  }
}

//watchingGeneratedFunction
export function* watchgetConsentRecordOfAMember() {
  yield takeEvery(
    memberActionTypes.CONSENT_RECORD_OF_MEMBER,
    getConsentRecordOfAMember,
  );
}

export function* getMembersOfSession(action) {
  try {
    yield put(startLoading());
    const memberList = yield call(getMemberListOfSession, action.payload);
    yield put({
      type: memberActionTypes.GET_MEMBERS_OF_SESSION_SUCCEEDED,
      payload: memberList,
    });
    yield put(stopLoading());
  } catch (error) {
    yield put(
      setError(
        error,
        "Something went wrong while getting the members of a session",
      ),
    );
  }
}

//watchingGeneratedFunction
export function* watchGetMembersOfSession() {
  yield takeEvery(
    memberActionTypes.GET_MEMBERS_OF_SESSION,
    getMembersOfSession,
  );
}

export default function* memberSagas() {
  yield all([
    watchGetMember(),
    watchGetMemberList(),
    watchgetAllErolmentOfAMember(),
    watchgetProgresRecordOfAMember(),
    watchupdateMulitpleStatusOnProgressRecordOfMember(),
    watchgetConsentRecordOfAMember(),
    watchGetMembersOfSession(),
  ]);
}

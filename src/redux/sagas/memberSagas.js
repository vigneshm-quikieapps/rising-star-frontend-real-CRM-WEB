import { put, takeEvery, takeLatest, call, all } from "redux-saga/effects";
import {
  getMembers,
  axiosGetMember,
  fetchgetAllErolmentOfAMember,
  axiosmemberDropped,
  axiosmemberSuspend,
  axiosmemberReturnFromSuspend,
  fetchgetProgresRecordOfAMember,
  updateMulitpleStatusOnProgresRecordOfAMember,
} from "../../services/memberServices";
import { startLoading, stopLoading } from "../action/shared-actions";
import { memberActionTypes, sharedActionTypes } from "../types";

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
    yield put({
      type: sharedActionTypes.SET_ERROR,
      payload:
        error?.response?.data?.message ||
        "Something went wrong while getting the member list",
    });
  }
}

export function* watchGetMemberList() {
  yield takeLatest(memberActionTypes.GET_ALL_MEMBERS, getMemberList);
}

export function* getMember(action) {
  const member = yield call(axiosGetMember, action.payload);
  yield put({ type: memberActionTypes.GET_MEMBER_BY_ID, payload: member });
}

export function* watchGetMember() {
  yield takeEvery(memberActionTypes.GET_MEMBER_BY_ID_SAGA, getMember);
}

export function* getAllErolmentOfAMember(action) {
  try {
    const enrol_list = yield call(fetchgetAllErolmentOfAMember, action.payload);
    yield put({
      type: memberActionTypes.GET_MEMBERS_ENROLLMENT,
      payload: enrol_list,
    });
  } catch (error) {
    yield put({
      type: memberActionTypes.GET_MEMBERS_ENROLLMENT_FAILED,
      payload: "Something went wrong while getting the data",
    });
  }
}

//watchingGeneratedFunction
export function* watchgetAllErolmentOfAMember() {
  yield takeEvery(
    memberActionTypes.GET_MEMBERS_ENROLLMENT_SAGA,
    getAllErolmentOfAMember
  );
}

export function* getProgresRecordOfAMember(action) {
  try {
    const progressRecord = yield call(
      fetchgetProgresRecordOfAMember,
      action.payload
    );
    yield put({
      type: memberActionTypes.GET_MEMBER_PROGRESS_RECORD,
      payload: progressRecord,
    });
  } catch (error) {
    yield put({
      type: memberActionTypes.GET_MEMBER_PROGRESS_RECORD_FAILED,
      payload: "something went wrong while getting progress record",
    });
  }
}

//watchingGeneratedFunction
export function* watchgetProgresRecordOfAMember() {
  yield takeEvery(
    memberActionTypes.GET_MEMBER_PROGRESS_RECORD_SAGA,
    getProgresRecordOfAMember
  );
}

export function* dropMemberFromEnrolment(action) {
  yield call(axiosmemberDropped, action.payload);
  yield put({
    type: memberActionTypes.MEMBER_ENROLMENT_DROPPED,
    // payload: progressRecord,
  });
}

export function* watchdropMemberFromEnrolment() {
  yield takeEvery(
    memberActionTypes.MEMBER_ENROLMENT_DROPPED_SAGA,
    dropMemberFromEnrolment
  );
}

export function* suspendMemberFromEnrolment(action) {
  yield call(axiosmemberSuspend, action.payload);
  yield put({
    type: memberActionTypes.MEMBER_ENROLMENT_SUSPEND,
    // payload: progressRecord,
  });
}

export function* watchsuspendMemberFromEnrolment() {
  yield takeEvery(
    memberActionTypes.MEMBER_ENROLMENT_SUSPEND_SAGA,
    suspendMemberFromEnrolment
  );
}

export function* returnFromSuspendMemberFromEnrolment(action) {
  yield call(axiosmemberReturnFromSuspend, action.payload);
  yield put({
    type: memberActionTypes.MEMBER_ENROLMENT_RETURN_FROM_SUSPEND,
    // payload: progressRecord,
  });
}

export function* watchreturnFromSuspendMemberFromEnrolment() {
  yield takeEvery(
    memberActionTypes.MEMBER_ENROLMENT_RETURN_FROM_SUSPEND_SAGA,
    returnFromSuspendMemberFromEnrolment
  );
}

export function* updateMulitpleStatusOnProgressRecordOfMember(action) {
  yield call(updateMulitpleStatusOnProgresRecordOfAMember, action.payload);
  yield put({
    type: memberActionTypes.UPDATE_MULTIPLE_STATUS_MEMBER_PROGRESS_RECORD,
    // payload: progressRecord,
  });
}

export function* watchupdateMulitpleStatusOnProgressRecordOfMember() {
  yield takeEvery(
    memberActionTypes.UPDATE_MULTIPLE_STATUS_MEMBER_PROGRESS_RECORD_SAGA,
    updateMulitpleStatusOnProgressRecordOfMember
  );
}

export default function* memberSagas() {
  yield all([
    watchGetMember(),
    watchGetMemberList(),
    watchgetAllErolmentOfAMember(),
    watchgetProgresRecordOfAMember(),
    watchupdateMulitpleStatusOnProgressRecordOfMember(),
    watchdropMemberFromEnrolment(),
    watchsuspendMemberFromEnrolment(),
    watchreturnFromSuspendMemberFromEnrolment(),
  ]);
}

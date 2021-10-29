import { put, takeEvery, call, all } from "redux-saga/effects";
import {
  axiosGetMember,
  axiosGetMemberList,
  fetchgetAllErolmentOfAMember,
  axiosmemberDropped,
  axiosmemberSuspend,
  axiosmemberReturnFromSuspend,
  fetchgetProgresRecordOfAMember,
  updateMulitpleStatusOnProgresRecordOfAMember,
} from "../../services/memberServices";
import { memberActionTypes, sharedActionTypes } from "../types";

import { startLoading, stopLoading } from "../action/shared-actions";

export function* getMemberList() {
  const member_list = yield call(axiosGetMemberList);
  yield put({ type: memberActionTypes.GET_ALL_MEMBERS, payload: member_list });
}

export function* watchGetMemberList() {
  yield takeEvery(memberActionTypes.GET_ALL_MEMBERS_SAGA, getMemberList);
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
    yield put(startLoading());
    const enrol_list = yield call(fetchgetAllErolmentOfAMember, action.payload);
    yield put({
      type: memberActionTypes.GET_MEMBERS_ENROLLMENT,
      payload: enrol_list,
    });
    yield put(stopLoading());
  } catch (error) {
    yield put({
      type: sharedActionTypes.SET_ERROR,
      payload:
        error?.response?.data?.message ||
        "Something went wrong while getting the member enrolment list",
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
    yield put(startLoading());
    const progressRecord = yield call(
      fetchgetProgresRecordOfAMember,
      action.payload
    );
    yield put({
      type: memberActionTypes.GET_MEMBER_PROGRESS_RECORD_SUCCEEDED,
      payload: progressRecord,
    });
    yield put(stopLoading());
  } catch (error) {
    yield put({
      type: sharedActionTypes.SET_ERROR,
      payload:
        error?.response?.data?.message ||
        "Something went wrong while getting the member progress record",
    });
  }
}

//watchingGeneratedFunction
export function* watchgetProgresRecordOfAMember() {
  yield takeEvery(
    memberActionTypes.GET_MEMBER_PROGRESS_RECORD,
    getProgresRecordOfAMember
  );
}

export function* dropMemberFromEnrolment(action) {
  try {
    yield put(startLoading());
    yield call(axiosmemberDropped, action.payload);
    yield put({
      type: memberActionTypes.MEMBER_ENROLMENT_DROPPED_SUCCEEDED,
    });
    yield put(stopLoading());
  } catch (error) {
    yield put({
      type: sharedActionTypes.SET_ERROR,
      payload:
        error?.response?.data?.message ||
        "Something went wrong while getting the member dropping a member",
    });
  }
}

export function* watchdropMemberFromEnrolment() {
  yield takeEvery(
    memberActionTypes.MEMBER_ENROLMENT_DROPPED,
    dropMemberFromEnrolment
  );
}

export function* suspendMemberFromEnrolment(action) {
  try {
    yield put(startLoading());
    yield call(axiosmemberSuspend, action.payload);
    yield put({
      type: memberActionTypes.MEMBER_ENROLMENT_SUSPEND_SUCCEEDED,
    });
    yield put(stopLoading());
  } catch (error) {
    yield put({
      type: sharedActionTypes.SET_ERROR,
      payload:
        error?.response?.data?.message ||
        "Something went wrong while getting the member suspending a member",
    });
  }
}

export function* watchsuspendMemberFromEnrolment() {
  yield takeEvery(
    memberActionTypes.MEMBER_ENROLMENT_SUSPEND,
    suspendMemberFromEnrolment
  );
}

export function* returnFromSuspendMemberFromEnrolment(action) {
  try {
    yield put(startLoading());
    yield call(axiosmemberReturnFromSuspend, action.payload);
    yield put({
      type: memberActionTypes.MEMBER_ENROLMENT_RETURN_FROM_SUSPEND_SUCCEEDED,
    });
    yield put(stopLoading());
  } catch (error) {
    yield put({
      type: sharedActionTypes.SET_ERROR,
      payload:
        error?.response?.data?.message ||
        "Something went wrong while marking return from suspend",
    });
  }
}

export function* watchreturnFromSuspendMemberFromEnrolment() {
  yield takeEvery(
    memberActionTypes.MEMBER_ENROLMENT_RETURN_FROM_SUSPEND,
    returnFromSuspendMemberFromEnrolment
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
    yield put({
      type: sharedActionTypes.SET_ERROR,
      payload:
        error?.response?.data?.message ||
        "Something went wrong while updating the multiple status on progress record",
    });
  }
}

export function* watchupdateMulitpleStatusOnProgressRecordOfMember() {
  yield takeEvery(
    memberActionTypes.UPDATE_MULTIPLE_STATUS_MEMBER_PROGRESS_RECORD,
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

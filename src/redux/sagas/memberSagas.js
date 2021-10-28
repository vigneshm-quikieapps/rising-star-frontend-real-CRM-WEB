import { put, takeEvery, call, all } from "redux-saga/effects";
import {
  axiosGetMember,
  axiosGetMemberList,
  fetchgetAllErolmentOfAMember,
  axiosmemberDropped,
  axiosmemberSuspend,
  axiosmemberReturnFromSuspend,
  fetchgetProgresRecordOfAMember,
  updateProgresRecordOfAMember,
} from "../../services/memberServices";
import { memberActionTypes } from "../types";

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

export function* updateProgressRecordOfMember(action) {
  yield call(updateProgresRecordOfAMember, action.payload);
  yield put({
    type: memberActionTypes.UPDATE_MEMBER_PROGRESS_RECORD,
    // payload: progressRecord,
  });
}

export function* watchupdateProgressRecordOfMember() {
  yield takeEvery(
    memberActionTypes.UPDATE_MEMBER_PROGRESS_RECORD_SAGA,
    updateProgressRecordOfMember
  );
}

export default function* memberSagas() {
  yield all([
    watchGetMember(),
    watchGetMemberList(),
    watchgetAllErolmentOfAMember(),
    watchgetProgresRecordOfAMember(),
    watchupdateProgressRecordOfMember(),
    watchdropMemberFromEnrolment(),
    watchsuspendMemberFromEnrolment(),
    watchreturnFromSuspendMemberFromEnrolment(),
  ]);
}

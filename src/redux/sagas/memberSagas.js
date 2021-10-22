import { put, takeEvery, call } from "redux-saga/effects";
import {
  axiosGetMember,
  axiosGetMemberList,
  fetchgetAllErolmentOfAMember,
  // fetchgetProgresRecordOfAMember,
} from "../../services/memberServices";
import { memberActionTypes } from "../types";

export function* getMemberList() {
  const member_list = yield call(axiosGetMemberList);
  yield put({ type: memberActionTypes.GET_ALL_MEMBERS, payload: member_list });
}

export function* watchGetMemberList() {
  yield takeEvery(memberActionTypes.GET_ALL_MEMBERS_SAGA, getMemberList);
}

export function* watchGetMember() {
  yield takeEvery(memberActionTypes.GET_MEMBER_BY_ID_SAGA, getMember);
}

export function* getMember(action) {
  const member = yield call(axiosGetMember, action.payload);
  yield put({ type: memberActionTypes.GET_MEMBER_BY_ID, payload: member });
}

export function* getAllErolmentOfAMember(action) {
  const enrol_list = yield call(fetchgetAllErolmentOfAMember, action.payload);
  yield put({
    type: memberActionTypes.GET_MEMBERS_ENROLLMENT,
    payload: enrol_list,
  });
}

//watchingGeneratedFunction
export function* watchgetAllErolmentOfAMember() {
  yield takeEvery(
    memberActionTypes.GET_MEMBERS_ENROLLMENT_SAGA,
    getAllErolmentOfAMember
  );
}

export function* getProgresRecordOfAMember(action) {
  const progressRecord = yield call(
    // fetchgetProgresRecordOfAMember,
    action.payload
  );
  yield put({
    type: memberActionTypes.GET_MEMBER_PROGRESS_RECORD,
    payload: progressRecord,
  });
}

//watchingGeneratedFunction
export function* watchgetProgresRecordOfAMember() {
  yield takeEvery(
    memberActionTypes.GET_MEMBER_PROGRESS_RECORD_SAGA,
    getProgresRecordOfAMember
  );
}

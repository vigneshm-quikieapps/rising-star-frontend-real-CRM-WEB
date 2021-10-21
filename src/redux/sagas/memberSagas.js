import { put, takeEvery, call } from "redux-saga/effects";
import {
  axiosGetMember,
  axiosGetMemberList,
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

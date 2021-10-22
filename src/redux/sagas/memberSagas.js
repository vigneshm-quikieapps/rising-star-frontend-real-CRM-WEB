import { put, takeEvery, call } from "redux-saga/effects";
import {
  axiosGetMember,
  axiosGetMemberList,
} from "../../services/memberServices";
import {
  GET_ALL_MEMBERS,
  GET_ALL_MEMBERS_SAGA,
  GET_MEMBER_BY_ID,
  GET_MEMBER_BY_ID_SAGA,
} from "../types";

export function* getMemberList() {
  const member_list = yield call(axiosGetMemberList);
  yield put({ type: GET_ALL_MEMBERS, payload: member_list });
}

export function* watchGetMemberList() {
  yield takeEvery(GET_ALL_MEMBERS_SAGA, getMemberList);
}

export function* watchGetMember() {
  yield takeEvery(GET_MEMBER_BY_ID_SAGA, getMember);
}

export function* getMember(action) {
  const member = yield call(axiosGetMember, action.payload);
  yield put({ type: GET_MEMBER_BY_ID, payload: member });
}

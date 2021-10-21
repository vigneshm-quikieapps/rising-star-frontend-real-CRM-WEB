import {
  put,
  takeEvery,
  TakeLatest,
  all,
  take,
  call,
} from "redux-saga/effects";
import fetchgetAllErolmentOfAMember from "../../services/memberServices";
import { GET_MEMBERS_ENROLLMENT, GET_MEMBERS_ENROLLMENT_SAGA } from "../types";

export function* getAllErolmentOfAMember(action) {
  const enrol_list = yield call(fetchgetAllErolmentOfAMember, action.payload);
  yield put({ type: GET_MEMBERS_ENROLLMENT, payload: enrol_list });
}

//watchingGeneratedFunction
export function* watchgetAllErolmentOfAMember() {
  yield takeEvery(GET_MEMBERS_ENROLLMENT_SAGA, getAllErolmentOfAMember);
}

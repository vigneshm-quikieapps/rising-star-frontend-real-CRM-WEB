import {
  put,
  takeEvery,
  TakeLatest,
  all,
  take,
  call,
} from "redux-saga/effects";
import fetchGetClass from "../../services/classServices";
import { GET_CLASS_LIST, GET_CLASS_LIST_SAGA } from "../types";

export function* getClassList() {
  const class_list = yield call(fetchGetClass);
  yield put({ type: GET_CLASS_LIST, payload: class_list });
}

//watchingGeneratedFunction
export function* watchGetClassList() {
  yield takeEvery(GET_CLASS_LIST_SAGA, getClassList);
}
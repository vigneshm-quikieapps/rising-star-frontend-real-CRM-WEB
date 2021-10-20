import { put, takeEvery, call } from "redux-saga/effects";
import fetchGetClasses from "../../services/classServices";
import {
  GET_CLASS_LIST,
  GET_CLASS_LIST_SUCCEEDED,
  GET_CLASS_LIST_FAILED,
} from "../types";

export function* getClassList(action) {
  try {
    const classList = yield call(fetchGetClasses, action.payload);
    yield put({ type: GET_CLASS_LIST_SUCCEEDED, payload: classList });
  } catch (error) {
    yield put({ type: GET_CLASS_LIST_FAILED, payload: error.message });
  }
}

//watchingGeneratedFunction
export function* classListSaga() {
  yield takeEvery(GET_CLASS_LIST, getClassList);
}

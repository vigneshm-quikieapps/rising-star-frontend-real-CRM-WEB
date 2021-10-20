import { put, takeEvery, call } from "redux-saga/effects";
import getClasses from "../../services/class-services";
import { classActionTypes } from "../types";

export function* getClassList(action) {
  try {
    const classList = yield call(getClasses, action.payload);
    yield put({ type: classActionTypes.GET_CLASS_LIST_SUCCEEDED, payload: classList });
  } catch (error) {
    yield put({ type: classActionTypes.GET_CLASS_LIST_FAILED, payload: error.message });
  }
}

//watchingGeneratedFunction
export function* classListSaga() {
  yield takeEvery(classActionTypes.GET_CLASS_LIST, getClassList);
}

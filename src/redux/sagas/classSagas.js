import { put, takeEvery, call } from "redux-saga/effects";
import { fetchGetClass } from "../../services/classServices";
import { GET_CLASS_LIST, GET_CLASS_LIST_SAGA, GET_TERM_SAGA } from "../types";

export function* getClassList(action) {
  const class_list = yield call(fetchGetClass, action.payload);
  // const Get_term = yield call(fetchGetTerm, class_list[0].businessId);
  yield put({ type: GET_TERM_SAGA, payload: class_list[0].businessId });
  console.log("class_list.data.docs", class_list);
  yield put({ type: GET_CLASS_LIST, payload: class_list });
}

//watchingGeneratedFunction
export function* watchGetClassList() {
  yield takeEvery(GET_CLASS_LIST_SAGA, getClassList);
}

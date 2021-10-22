import {
  put,
  takeEvery,
  TakeLatest,
  all,
  take,
  call,
} from "redux-saga/effects";
import { fetchGetClass } from "../../services/classServices";
import { fetchGetTerm } from "../../services/termServices";
import { GET_CLASS_LIST, GET_CLASS_LIST_SAGA, GET_TERM } from "../types";

export function* getClassList(action) {
  const class_list = yield call(fetchGetClass, action.payload);
  const Get_term = yield call(fetchGetTerm, class_list[0].businessId);
 
  console.log("class_list.data.docs", class_list);
  yield put({ type: GET_CLASS_LIST, payload: class_list });
  yield put({ type: GET_TERM, payload: Get_term });
}

//watchingGeneratedFunction
export function* watchGetClassList() {
  yield takeEvery(GET_CLASS_LIST_SAGA, getClassList);
}

import { put, takeEvery, call, all } from "redux-saga/effects";
import { evaluationsActionTypes } from "../types";

import { getAllEvaluationScheme } from "../../services/evaluationServices";

export function* getEvaluationSchemeList() {
  const member_list = yield call(getAllEvaluationScheme);
  yield put({
    type: evaluationsActionTypes.GET_EVALUATION_SCHEME,
    payload: member_list,
  });
}

export function* watchgetEvaluationSchemeList() {
  yield takeEvery(
    evaluationsActionTypes.GET_EVALUATION_SCHEME_SAGA,
    getEvaluationSchemeList
  );
}

export default function* evaluationSagas() {
  yield all([watchgetEvaluationSchemeList()]);
}

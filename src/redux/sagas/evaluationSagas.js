import { put, takeEvery, call, all } from "redux-saga/effects";
import { evaluationsActionTypes } from "../types";

import { getAllEvaluationScheme } from "../../services/evaluationServices";

export function* getEvaluationSchemeList() {
  try {
    const member_list = yield call(getAllEvaluationScheme);
    yield put({
      type: evaluationsActionTypes.GET_EVALUATION_SCHEME,
      payload: member_list,
    });
  } catch (error) {
    yield put({
      type: evaluationsActionTypes.GET_EVALUATION_SCHEME_FAILED,
      payload: "Something went wrong while getting the evaluation",
    });
  }
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

import { put, takeEvery, call, all } from "redux-saga/effects";
import { evaluationsActionTypes, sharedActionTypes } from "../types";

import { getAllEvaluationScheme } from "../../services/evaluationServices";

import { startLoading, stopLoading } from "../action/shared-actions";

export function* getEvaluationSchemeList() {
  try {
    yield put(startLoading());
    const member_list = yield call(getAllEvaluationScheme);
    yield put({
      type: evaluationsActionTypes.GET_EVALUATION_SCHEME_SUCCEEDED,
      payload: member_list,
    });
    yield put(stopLoading());
  } catch (error) {
    yield put({
      type: sharedActionTypes.SET_ERROR,
      payload:
        error?.response?.data?.message ||
        "Something went wrong while getting the evaluation scheme list",
    });
  }
}

export function* watchgetEvaluationSchemeList() {
  yield takeEvery(
    evaluationsActionTypes.GET_EVALUATION_SCHEME,
    getEvaluationSchemeList
  );
}

export default function* evaluationSagas() {
  yield all([watchgetEvaluationSchemeList()]);
}

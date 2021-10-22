import { put, takeEvery, call, all } from "redux-saga/effects";
import {
  axiosGetAllTerms,
  axiosGetSessionsByTermId,
} from "../../services/term-services";
import { termsActionTypes } from "../types";

export function* getAllTerms() {
  const allTerms = yield call(axiosGetAllTerms);
  yield put({
    type: termsActionTypes.GET_ALL_TERMS,
    payload: allTerms,
  });
}

export function* watchGetAllTerms() {
  yield takeEvery(termsActionTypes.GET_ALL_TERMS_SAGA, getAllTerms);
}

export function* getSessionsByTermId(action) {
  const allTerms = yield call(axiosGetSessionsByTermId, action.payload);
  yield put({
    type: termsActionTypes.GET_ALL_SESSIONS_OF_A_TERM,
    payload: allTerms,
  });
}

export function* watchGetSessionsByTermId() {
  yield takeEvery(
    termsActionTypes.GET_ALL_SESSIONS_OF_A_TERM_SAGA,
    getSessionsByTermId
  );
}

export default function* termSagas() {
  yield all([watchGetAllTerms(), watchGetSessionsByTermId()]);
}

import { put, takeEvery, takeLatest, call, all } from "redux-saga/effects";
import {
  axiosGetAllTerms,
  axiosGetSessionsByTermId,
  getTermsOfBusiness,
} from "../../services/term-services";
import { termsActionTypes } from "../types";

export function* getAllTerms() {
  try {
    const allTerms = yield call(axiosGetAllTerms);
    yield put({
      type: termsActionTypes.GET_ALL_TERMS_SUCCEEDED,
      payload: allTerms,
    });
  } catch (error) {
    yield put({
      type: termsActionTypes.GET_ALL_TERMS_FAILED,
      payload: error.message,
    });
  }
}

export function* watchGetAllTerms() {
  yield takeEvery(termsActionTypes.GET_ALL_TERMS, getAllTerms);
}

export function* getSessionsByTermId(action) {
  try {
    const allTerms = yield call(axiosGetSessionsByTermId, action.payload);
    yield put({
      type: termsActionTypes.GET_ALL_SESSIONS_OF_A_TERM_SUCCEEDED,
      payload: allTerms,
    });
  } catch (error) {
    yield put({
      type: termsActionTypes.GET_ALL_SESSIONS_OF_A_TERM_FAILED,
      payload: error.message,
    });
  }
}

export function* watchGetSessionsByTermId() {
  yield takeEvery(
    termsActionTypes.GET_ALL_SESSIONS_OF_A_TERM,
    getSessionsByTermId
  );
}

function* getTermListOfBusiness(action) {
  try {
    const terms = yield call(getTermsOfBusiness, action.payload);
    yield put({
      type: termsActionTypes.GET_TERMS_OF_A_BUSINESS_SUCCEEDED,
      payload: terms,
    });
  } catch (error) {
    yield put({
      type: termsActionTypes.GET_TERMS_OF_A_BUSINESS_FAILED,
      payload:
        error.message ||
        "Something went wrong while getting list of terms of the business",
    });
  }
}

function* watchGetTermListOfBusiness() {
  yield takeLatest(
    termsActionTypes.GET_TERMS_OF_A_BUSINESS,
    getTermListOfBusiness
  );
}

export default function* termSagas() {
  yield all([
    watchGetAllTerms(),
    watchGetSessionsByTermId(),
    watchGetTermListOfBusiness(),
  ]);
}

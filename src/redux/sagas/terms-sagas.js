import { put, takeEvery, takeLatest, call, all } from "redux-saga/effects";
import {
  axiosGetAllTerms,
  getTermsOfBusiness,
  addTerm,
  deleteTerm,
  editTerm,
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

export function* getTermListOfBusiness(action) {
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
        error.response.data.message ||
        "Something went wrong while getting list of terms of the business",
    });
  }
}

export function* watchGetTermListOfBusiness() {
  yield takeLatest(
    termsActionTypes.GET_TERMS_OF_A_BUSINESS,
    getTermListOfBusiness
  );
}

export function* addNewTerm(action) {
  try {
    const newTerm = yield call(addTerm, action.payload);
    yield put({
      type: termsActionTypes.ADD_NEW_TERM_SUCCEEDED,
      payload: newTerm,
    });
  } catch (error) {
    yield put({
      type: termsActionTypes.ADD_NEW_TERM_FAILED,
      payload:
        error.response.data.message ||
        "Something went wrong while adding the new term",
    });
  }
}

export function* watchAddNewTerm() {
  yield takeEvery(termsActionTypes.ADD_NEW_TERM, addNewTerm);
}

export function* deleteTermSaga(action) {
  try {
    const deletedTermId = yield call(deleteTerm, action.payload);
    yield put({
      type: termsActionTypes.DELETE_TERM_SUCCEEDED,
      payload: deletedTermId,
    });
  } catch (error) {
    yield put({
      type: termsActionTypes.DELETE_TERM_FAILED,
      payload:
        error.response.data.message ||
        "Something went wrong while deleting the term",
    });
  }
}

export function* watchDeleteTerm() {
  yield takeEvery(termsActionTypes.DELETE_TERM, deleteTermSaga);
}

export function* editTermSaga(action) {
  try {
    const editedTerm = yield call(editTerm, action.payload);
    yield put({
      type: termsActionTypes.EDIT_TERM_SUCCEEDED,
      payload: editedTerm,
    });
  } catch (error) {
    yield put({
      type: termsActionTypes.EDIT_TERM_FAILED,
      payload:
        error.response.data.message ||
        "Something went wrong while editing the specified term",
    });
  }
}

export function* watchEditTerm() {
  yield takeEvery(termsActionTypes.EDIT_TERM, editTermSaga);
}

export default function* termSagas() {
  yield all([
    watchGetAllTerms(),
    watchGetTermListOfBusiness(),
    watchAddNewTerm(),
    watchDeleteTerm(),
    watchEditTerm(),
  ]);
}

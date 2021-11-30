import { put, takeEvery, takeLatest, call, all } from "redux-saga/effects";
import {
  axiosGetAllTerms,
  getTermsOfBusiness,
  addTerm,
  deleteTerm,
  editTerm,
  getTermsListOfClass,
} from "../../services/term-services";
import { startLoading, stopLoading } from "../action/shared-actions";
import { termsActionTypes } from "../types";
import { setError } from "../action/shared-actions";

export function* getAllTerms() {
  try {
    yield put(startLoading());
    const allTerms = yield call(axiosGetAllTerms);
    yield put({
      type: termsActionTypes.GET_ALL_TERMS_SUCCEEDED,
      payload: allTerms,
    });
    yield put(stopLoading());
  } catch (error) {
    yield put(
      setError(error, "Something went wrong while getting the list of terms")
    );
  }
}

export function* watchGetAllTerms() {
  yield takeEvery(termsActionTypes.GET_ALL_TERMS, getAllTerms);
}

export function* getTermListOfBusiness(action) {
  try {
    yield put(startLoading());
    const terms = yield call(getTermsOfBusiness, action.payload);
    yield put({
      type: termsActionTypes.GET_TERMS_OF_A_BUSINESS_SUCCEEDED,
      payload: terms,
    });
    yield put(stopLoading());
  } catch (error) {
    yield put(
      setError(
        error,
        "Something went wrong while getting list of terms of the business"
      )
    );
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
    yield put(startLoading());
    const newTerm = yield call(addTerm, action.payload);
    yield put({
      type: termsActionTypes.ADD_NEW_TERM_SUCCEEDED,
      payload: newTerm,
    });
    yield put(stopLoading());
  } catch (error) {
    yield put(
      setError(error, "Something went wrong while adding the new term")
    );
  }
}

export function* watchAddNewTerm() {
  yield takeEvery(termsActionTypes.ADD_NEW_TERM, addNewTerm);
}

export function* deleteTermSaga(action) {
  try {
    yield put(startLoading());
    const deletedTermId = yield call(deleteTerm, action.payload);
    yield put({
      type: termsActionTypes.DELETE_TERM_SUCCEEDED,
      payload: deletedTermId,
    });
    yield put(stopLoading());
  } catch (error) {
    yield put(setError(error, "Something went wrong while deleting the term"));
  }
}

export function* watchDeleteTerm() {
  yield takeEvery(termsActionTypes.DELETE_TERM, deleteTermSaga);
}

export function* editTermSaga(action) {
  try {
    yield put(startLoading());
    const editedTerm = yield call(editTerm, action.payload);
    yield put({
      type: termsActionTypes.EDIT_TERM_SUCCEEDED,
      payload: editedTerm,
    });
    yield put(stopLoading());
  } catch (error) {
    yield put(
      setError(error, "Something went wrong while editing the specified term")
    );
  }
}

export function* watchEditTerm() {
  yield takeEvery(termsActionTypes.EDIT_TERM, editTermSaga);
}

export function* watchGetTermsOfClass() {
  yield takeEvery(termsActionTypes.GET_TERMS_OF_CLASS, getTermsOfClass);
}

export function* getTermsOfClass(action) {
  try {
    yield put(startLoading());
    const termsList = yield call(getTermsListOfClass, action.payload);
    yield put({
      type: termsActionTypes.GET_TERMS_OF_CLASS_SUCCEEDED,
      payload: { terms: termsList.terms, classId: action.payload },
    });
    yield put(stopLoading());
  } catch (error) {
    yield put(
      setError(error, "Something went wrong while getting terms of a class")
    );
  }
}

export default function* termSagas() {
  yield all([
    watchGetAllTerms(),
    watchGetTermListOfBusiness(),
    watchAddNewTerm(),
    watchDeleteTerm(),
    watchEditTerm(),
    watchGetTermsOfClass(),
  ]);
}

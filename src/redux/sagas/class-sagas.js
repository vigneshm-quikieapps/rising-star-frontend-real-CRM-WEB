import { put, takeEvery, takeLatest, call, all } from "redux-saga/effects";
import {
  getClasses,
  deleteClassByID,
  getClassById,
  addNewClass,
  getTermsListOfClass,
  getClassSessions,
} from "../../services/class-services";
import { startLoading, stopLoading } from "../action/shared-actions";
import { classActionTypes, sharedActionTypes } from "../types";

export function* getClassList(action) {
  try {
    yield put(startLoading());
    const state = yield call(getClasses, action.payload);
    yield put({
      type: classActionTypes.GET_CLASS_LIST_SUCCEEDED,
      payload: state,
    });
    yield put(stopLoading());
  } catch (error) {
    yield put({
      type: sharedActionTypes.SET_ERROR,
      payload:
        error?.response?.data?.message ||
        "Something went wrong while getting the class list",
    });
  }
}

//watchingGeneratedFunction
export function* classListSaga() {
  yield takeEvery(classActionTypes.GET_CLASS_LIST, getClassList);
}

export function* deleteClass(action) {
  try {
    yield put(startLoading());
    yield call(deleteClassByID, action.payload);
    yield put({
      type: classActionTypes.DELETE_CLASS_SUCCEEDED,
      payload: action.payload,
    });
    yield put(stopLoading());
  } catch (error) {
    yield put({
      type: sharedActionTypes.SET_ERROR,
      payload:
        error?.response?.data?.message ||
        "Something went wrong while deleting the class",
    });
  }
}

export function* deleteClassSaga() {
  yield takeEvery(classActionTypes.DELETE_CLASS, deleteClass);
}

export function* getSingleClassById(action) {
  try {
    yield put(startLoading());
    const classObj = yield call(getClassById, action.payload);
    yield put({
      type: classActionTypes.GET_CLASS_BY_ID_SUCCEEDED,
      payload: classObj,
    });
    yield put(stopLoading());
  } catch (error) {
    yield put(stopLoading());
    yield put({
      type: sharedActionTypes.SET_ERROR,
      payload:
        error?.response?.data?.message ||
        "Something went wrong while getting the class by ID",
    });
  }
}

export function* watchGetClassById() {
  yield takeEvery(classActionTypes.GET_CLASS_BY_ID, getSingleClassById);
}

export function* watchAddClass() {
  yield takeEvery(classActionTypes.ADD_CLASS, addClass);
}

export function* addClass(action) {
  const classObj = yield call(addNewClass, action.payload);
  yield put({ type: classActionTypes.ADD_CLASS_SUCCEEDED, payload: classObj });
}

export function* watchGetTermsOfClass() {
  yield takeEvery(classActionTypes.GET_TERMS_OF_CLASS, getTermsOfClass);
}

export function* getTermsOfClass(action) {
  const termsList = yield call(getTermsListOfClass, action.payload);
  yield put({
    type: classActionTypes.GET_TERMS_OF_CLASS_SUCCEEDED,
    payload: termsList,
  });
}

export function* getSessionsOfClass(action) {
  try {
    yield put(startLoading());
    const sessions = yield call(getClassSessions, action.payload);
    yield put({
      type: classActionTypes.GET_CLASS_SESSIONS_SUCCEEDED,
      payload: sessions,
    });
    yield put(stopLoading());
  } catch (error) {
    yield put(stopLoading());
    yield put({
      type: sharedActionTypes.SET_ERROR,
      payload:
        error?.response?.data?.message ||
        "Something went wrong while getting the class sessions",
    });
  }
}

export function* watchGetSessionsOfClass() {
  yield takeLatest(classActionTypes.GET_CLASS_SESSIONS, getSessionsOfClass);
}

export default function* classSagas() {
  yield all([
    classListSaga(),
    deleteClassSaga(),
    watchGetClassById(),
    watchAddClass(),
    watchGetSessionsOfClass(),
  ]);
}

import { put, takeEvery, call, all } from "redux-saga/effects";
import {
  getClasses,
  deleteClassByID,
  getClassById,
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

export default function* classSagas() {
  yield all([classListSaga(), deleteClassSaga(), watchGetClassById()]);
}

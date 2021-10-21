import { put, takeEvery, call, all } from "redux-saga/effects";
import {
  getClasses,
  deleteClassByID,
  axiosGetClassById,
} from "../../services/class-services";
import { classActionTypes } from "../types";

export function* getClassList(action) {
  try {
    yield put({ type: classActionTypes.SET_LOADING, payload: true });
    const classList = yield call(getClasses);
    yield put({
      type: classActionTypes.GET_CLASS_LIST_SUCCEEDED,
      payload: classList,
    });
  } catch (error) {
    yield put({
      type: classActionTypes.GET_CLASS_LIST_FAILED,
      payload: error.message,
    });
  }
}

//watchingGeneratedFunction
export function* classListSaga() {
  yield takeEvery(classActionTypes.GET_CLASS_LIST, getClassList);
}

export function* deleteClass(action) {
  try {
    yield put({ type: classActionTypes.SET_LOADING, payload: true });
    yield call(deleteClassByID, action.payload);
    yield put({
      type: classActionTypes.DELETE_CLASS_SUCCEEDED,
      payload: action.payload,
    });
  } catch (error) {
    yield put({
      type: classActionTypes.DELETE_CLASS_FAILED,
      payload: error.message,
    });
  }
}

export function* deleteClassSaga() {
  yield takeEvery(classActionTypes.DELETE_CLASS, deleteClass);
}

export function* watchGetClassById() {
  yield takeEvery(classActionTypes.GET_CLASS_BY_ID_SAGA, getClassById);
}

export function* getClassById(action) {
  const classObj = yield call(axiosGetClassById, action.payload);
  yield put({ type: classActionTypes.GET_CLASS_BY_ID, payload: classObj });
}

export default function* classSagas() {
  yield all([classListSaga(), deleteClassSaga(), watchGetClassById()]);
}

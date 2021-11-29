import { put, takeEvery, takeLatest, call, all } from "redux-saga/effects";
import {
  getClasses,
  deleteClassByID,
  getClassById,
  addNewClass,
  getClassSessions,
  updateClass,
  updateSessionOfClass,
  addSessionToClass,
  deleteSessionFromClass,
} from "../../services/class-services";
import { setError, startLoading, stopLoading } from "../action/shared-actions";
import { classActionTypes } from "../types";

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
    yield put(
      setError(error, "Something went wrong while getting the class list")
    );
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
    yield put(setError(error, "Something went wrong while deleting the class"));
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
    yield put(
      setError(error, "Something went wrong while getting the class by ID")
    );
  }
}

export function* watchGetClassById() {
  yield takeEvery(classActionTypes.GET_CLASS_BY_ID, getSingleClassById);
}

export function* watchAddClass() {
  yield takeEvery(classActionTypes.ADD_CLASS, addClass);
}

export function* addClass(action) {
  try {
    yield put(startLoading());
    const classObj = yield call(addNewClass, action.payload);
    yield put({
      type: classActionTypes.ADD_CLASS_SUCCEEDED,
      payload: classObj,
    });
    yield call(action.payload.callback);
    yield put(stopLoading());
  } catch (error) {
    yield put(setError(error, "Something went wrong while adding a new class"));
  }
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
    yield put(
      setError(error, "Something went wrong while getting the class sessions")
    );
  }
}

export function* watchGetSessionsOfClass() {
  yield takeLatest(classActionTypes.GET_CLASS_SESSIONS, getSessionsOfClass);
}

export function* watchEditClass() {
  yield takeEvery(classActionTypes.EDIT_CLASS, editClass);
}

export function* editClass(action) {
  try {
    yield put(startLoading());
    const classObj = yield call(updateClass, action.payload);
    yield put({
      type: classActionTypes.EDIT_CLASS_SUCCEEDED,
      payload: classObj,
    });
    yield call(action.payload.callback);
    yield put(stopLoading());
  } catch (error) {
    yield put(setError(error, "Something went wrong while editing a class"));
  }
}

export function* watchEditSessionOfClass() {
  yield takeEvery(classActionTypes.UPDATE_SESSION_OF_CLASS, editSessionOfClass);
}

export function* editSessionOfClass(action) {
  try {
    yield put(startLoading());
    const session = yield call(updateSessionOfClass, action.payload.data);
    yield put({
      type: classActionTypes.UPDATE_SESSION_OF_CLASS_SUCCEEDED,
      payload: session,
    });
    yield call(action.payload.callback);
    yield put(stopLoading());
  } catch (error) {
    yield put(
      setError(error, "Something went wrong while editing a session of a class")
    );
  }
}

export function* watchAddSessionToClass() {
  yield takeEvery(classActionTypes.ADD_SESSION_TO_CLASS, addSessionToAClass);
}

export function* addSessionToAClass(action) {
  try {
    yield put(startLoading());
    const session = yield call(addSessionToClass, action.payload.sessionData);
    yield put({
      type: classActionTypes.ADD_SESSION_TO_CLASS_SUCCEEDED,
      payload: session,
    });
    yield call(action.payload.callback);
    yield put(stopLoading());
  } catch (error) {
    yield put(
      setError(error, "Something went wrong while adding a session to a class")
    );
  }
}

export function* watchDeleteSessionFromClass() {
  yield takeEvery(
    classActionTypes.DELETE_SESSION_FROM_CLASS,
    deleteSessionFromAClass
  );
}

export function* deleteSessionFromAClass(action) {
  try {
    yield put(startLoading());
    yield call(deleteSessionFromClass, action.payload);
    yield put({
      type: classActionTypes.DELETE_SESSION_FROM_CLASS_SUCCEEDED,
      payload: action.payload,
    });
    yield put(stopLoading());
  } catch (error) {
    yield put(
      setError(
        error,
        "Something went wrong while deleting a session from a class"
      )
    );
  }
}

export default function* classSagas() {
  yield all([
    classListSaga(),
    deleteClassSaga(),
    watchGetClassById(),
    watchAddClass(),
    watchGetSessionsOfClass(),
    watchEditClass(),
    watchEditSessionOfClass(),
    watchAddSessionToClass(),
    watchDeleteSessionFromClass(),
  ]);
}

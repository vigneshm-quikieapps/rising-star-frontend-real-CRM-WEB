import { call, put, takeEvery } from "@redux-saga/core/effects";
import {
  fetchCreateTerm,
  fetchDeleteTerm,
  fetchGetTerm,
  fetchUpdateTerm,
} from "../../services/termServices";
import {
  CREATE_TERM,
  CREATE_TERM_SAGA,
  DELETE_TERM,
  DELETE_TERM_SAGA,
  EDIT_TERM,
  EDIT_TERM_ITEM,
  EDIT_TERM_SAGA,
  GET_TERM,
  GET_TERM_SAGA,
  UPDATE_TERM,
  UPDATE_TERM_SAGA,
} from "../types";
export function* GetTerm(action) {
  console.log("ggg");
  const Get_term = yield call(fetchGetTerm, action.payload);
  yield put({ type: GET_TERM, payload: Get_term });
}
export function* CreateTerm(action) {
  console.log("ggg");
  const Create_term = yield call(fetchCreateTerm, action.payload);
  yield put({ type: CREATE_TERM, payload: Create_term });
}
export function* EditTerm(action) {
  console.log("ggg",action.payload.value);
  const key=action.payload.key
  const a ={...action.payload.Termlist[action.payload.index],[key]:action.payload.value}
  yield put({ type: EDIT_TERM_ITEM, payload: a });
  action.payload.Termlist[action.payload.index]=a;
  console.log("action.payload.Termlist",action.payload.Termlist);
  yield put({ type: EDIT_TERM, payload: action.payload.Termlist });
}
export function* UpdateTerm(action) {
  console.log("ggg");
  const updated_term = yield call(fetchUpdateTerm, action.payload);
  yield put({ type: UPDATE_TERM, payload: updated_term });
}
export function* DeleteTerm(action) {
  console.log("ggfg");
  const deleted_term = yield call(fetchDeleteTerm, action.payload);
  yield put({ type: DELETE_TERM });
}
export function* watchGetTerm() {
  yield takeEvery(GET_TERM_SAGA, GetTerm);
}
export function* watchCreateTerm() {
  yield takeEvery(CREATE_TERM_SAGA, CreateTerm);
}
export function* watchEditTerm() {
  yield takeEvery(EDIT_TERM_SAGA, EditTerm);
}
export function* watchUpdateTerm() {
  yield takeEvery(UPDATE_TERM_SAGA, UpdateTerm);
}
export function* watchDeleteTerm() {
  yield takeEvery(DELETE_TERM_SAGA, DeleteTerm);
}

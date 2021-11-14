import { put, takeEvery, call, all } from "redux-saga/effects";
import { startLoading, stopLoading, setError } from "../action/shared-actions";
import {
  drop,
  suspend,
  returnFromSuspend,
  transfer,
} from "../../services/enrolmentServices";
import { enrolmentActionTypes } from "../types";

export function* dropMember(action) {
  try {
    yield put(startLoading());
    yield call(drop, action.payload);
    yield put({
      type: enrolmentActionTypes.DROP_SUCCEEDED,
      payload: { enrolmentId: action.payload },
    });
    yield put(stopLoading());
  } catch (error) {
    yield put(setError(error, "Something went wrong while dropping a member"));
  }
}

export function* watchDropMember() {
  yield takeEvery(enrolmentActionTypes.DROP, dropMember);
}

export function* suspendEnrolment(action) {
  try {
    yield put(startLoading());
    yield call(suspend, action.payload);
    yield put({
      type: enrolmentActionTypes.SUSPEND_SUCCEEDED,
      payload: { enrolmentId: action.payload },
    });
    yield put(stopLoading());
  } catch (error) {
    yield put(
      setError(error, "Something went wrong while suspending a member")
    );
  }
}

export function* watchSuspend() {
  yield takeEvery(enrolmentActionTypes.SUSPEND, suspendEnrolment);
}

export function* returnFromSuspendSaga(action) {
  try {
    yield put(startLoading());
    yield call(returnFromSuspend, action.payload);
    yield put({
      type: enrolmentActionTypes.RETURN_FROM_SUSPEND_SUCCEEDED,
      payload: { enrolmentId: action.payload },
    });
    yield put(stopLoading());
  } catch (error) {
    yield put(
      setError(error, "Something went wrong while marking return from suspend")
    );
  }
}

export function* watchReturnFromSuspend() {
  yield takeEvery(
    enrolmentActionTypes.RETURN_FROM_SUSPEND,
    returnFromSuspendSaga
  );
}

export function* transferEnrolmentSaga(action) {
  try {
    yield put(startLoading());
    yield call(transfer, action.payload);
    yield put({
      type: enrolmentActionTypes.TRANSFER_SUCCEEDED,
      payload: action.payload,
    });
    yield put(stopLoading());
  } catch (error) {
    yield put(setError(error, "Something went wrong while session transfer"));
  }
}

export function* watchTransferEnrolment() {
  yield takeEvery(enrolmentActionTypes.TRANSFER, transferEnrolmentSaga);
}

export default function* enrolmentSagas() {
  yield all([
    watchDropMember(),
    watchSuspend(),
    watchReturnFromSuspend(),
    watchTransferEnrolment(),
  ]);
}

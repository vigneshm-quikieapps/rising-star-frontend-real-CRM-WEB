import { put, takeEvery, call, all } from "redux-saga/effects";
import { startLoading, stopLoading } from "../action/shared-actions";
import {
  axiosmemberDropped,
  axiosmemberSuspend,
  axiosmemberReturnFromSuspend,
  transferEnrolment,
} from "../../services/enrolmentServices";
import { enrolmentActionTypes, sharedActionTypes } from "../types";

export function* dropMemberFromEnrolment(action) {
  try {
    yield put(startLoading());
    yield call(axiosmemberDropped, action.payload);
    yield put({
      type: enrolmentActionTypes.MEMBER_ENROLMENT_DROPPED_SUCCEEDED,
    });
    yield put(stopLoading());
  } catch (error) {
    yield put({
      type: sharedActionTypes.SET_ERROR,
      payload:
        error?.response?.data?.message ||
        "Something went wrong while getting the member dropping a member",
    });
  }
}

export function* watchdropMemberFromEnrolment() {
  yield takeEvery(
    enrolmentActionTypes.MEMBER_ENROLMENT_DROPPED,
    dropMemberFromEnrolment
  );
}

export function* suspendMemberFromEnrolment(action) {
  try {
    yield put(startLoading());
    yield call(axiosmemberSuspend, action.payload);
    yield put({
      type: enrolmentActionTypes.MEMBER_ENROLMENT_SUSPEND_SUCCEEDED,
    });
    yield put(stopLoading());
  } catch (error) {
    yield put({
      type: sharedActionTypes.SET_ERROR,
      payload:
        error?.response?.data?.message ||
        "Something went wrong while getting the member suspending a member",
    });
  }
}

export function* watchsuspendMemberFromEnrolment() {
  yield takeEvery(
    enrolmentActionTypes.MEMBER_ENROLMENT_SUSPEND,
    suspendMemberFromEnrolment
  );
}

export function* returnFromSuspendMemberFromEnrolment(action) {
  try {
    yield put(startLoading());
    yield call(axiosmemberReturnFromSuspend, action.payload);
    yield put({
      type: enrolmentActionTypes.MEMBER_ENROLMENT_RETURN_FROM_SUSPEND_SUCCEEDED,
    });
    yield put(stopLoading());
  } catch (error) {
    yield put({
      type: sharedActionTypes.SET_ERROR,
      payload:
        error?.response?.data?.message ||
        "Something went wrong while marking return from suspend",
    });
  }
}

export function* watchreturnFromSuspendMemberFromEnrolment() {
  yield takeEvery(
    enrolmentActionTypes.MEMBER_ENROLMENT_RETURN_FROM_SUSPEND,
    returnFromSuspendMemberFromEnrolment
  );
}

export function* returnTransferEnrolment(action) {
  try {
    yield put(startLoading());
    yield call(transferEnrolment, action.payload);
    yield put({
      type: enrolmentActionTypes.TRANSFER_MEMBER_ENROLMENT_SUCCEEDED,
    });
    yield put(stopLoading());
  } catch (error) {
    yield put({
      type: sharedActionTypes.SET_ERROR,
      payload:
        error?.response?.data?.message ||
        "Something went wrong while marking return from suspend",
    });
  }
}

export function* watchTransferEnrolment() {
  yield takeEvery(
    enrolmentActionTypes.TRANSFER_MEMBER_ENROLMENT,
    returnTransferEnrolment
  );
}

export default function* enrolmentSagas() {
  yield all([
    watchdropMemberFromEnrolment(),
    watchsuspendMemberFromEnrolment(),
    watchreturnFromSuspendMemberFromEnrolment(),
    watchTransferEnrolment(),
  ]);
}

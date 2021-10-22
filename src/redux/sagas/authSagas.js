import { all, call, put, takeLatest } from "redux-saga/effects";

import { logInFailure, logInSuccess } from "../action/authAction";
import { LoginActionTypes } from "../types";

import logIn from "../../services/authServices";

export function* logInWithCredentials({ payload: { mobileNo, password } }) {
  try {
    const user = yield logIn(mobileNo, password);
    yield put(logInSuccess(user));
  } catch (error) {
    yield put(logInFailure(error));
  }
}

export function* logInAfterRegister({ payload: { mobileNo, password } }) {
  yield logInWithCredentials({ payload: { mobileNo, password } });
}

export function* onLogInStart() {
  yield takeLatest(LoginActionTypes.LOG_IN_START, logInWithCredentials);
}

export function* authSagas() {
  yield all([call(onLogInStart)]);
}

// mongodb+srv://mystery_user:akvguG!S5v_bXpn@cluster0.frvkd.mongodb.net/risingStar?retryWrites=true&w=majority

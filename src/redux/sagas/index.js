import { all, call } from "@redux-saga/core/effects";
import memberSagas from "./memberSagas";
import sessionSagas from "./sessionSagas";
import classSagas from "./class-sagas";
import businessesSagas from "./businesses-saga";
import { authSagas } from "./authSagas";
import termSagas from "./terms-sagas";
import evaluationSagas from "./evaluationSagas";

export default function* rootSaga() {
  yield all([
    memberSagas(),
    sessionSagas(),
    call(authSagas),
    classSagas(),
    businessesSagas(),
    termSagas(),
    evaluationSagas(),
  ]);
}

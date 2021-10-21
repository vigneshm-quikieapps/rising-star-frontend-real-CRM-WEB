import { all, call } from "@redux-saga/core/effects";
import { watchGetClassList } from "./classSagas";
import { watchGetMember, watchGetMemberList } from "./memberSagas";
import { watchGetMemberEnrolledInSession } from "./sessionSagas";
import classSagas from "./class-sagas";
import businessesSagas from "./businesses-saga";
import { authSagas } from "./authSagas";

export default function* rootSaga() {
  yield all([
    watchGetClassList(),
    watchGetMemberList(),
    watchGetMember(),
    watchGetMemberEnrolledInSession(),
    call(authSagas),
    classSagas(),
    businessesSagas(),
  ]);
}

import { all, call } from "@redux-saga/core/effects";
import { watchGetMember, watchGetMemberList } from "./memberSagas";
import { watchGetMemberEnrolledInSession } from "./sessionSagas";
import classSagas from "./class-sagas";
import businessesSagas from "./businesses-saga";
import { authSagas } from "./authSagas";
import { watchgetAllErolmentOfAMember } from "./memberSagas";

export default function* rootSaga() {
  yield all([
    watchgetAllErolmentOfAMember(),
    watchGetMemberList(),
    watchGetMember(),
    watchGetMemberEnrolledInSession(),
    call(authSagas),
    classSagas(),
    businessesSagas(),
  ]);
}

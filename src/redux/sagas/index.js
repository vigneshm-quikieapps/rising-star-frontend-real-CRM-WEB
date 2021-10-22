import { all, call } from "@redux-saga/core/effects";
import {
  watchGetMember,
  watchGetMemberList,
  watchgetAllErolmentOfAMember,
  watchgetProgresRecordOfAMember,
} from "./memberSagas";
import { watchGetMemberEnrolledInSession } from "./sessionSagas";
import classSagas from "./class-sagas";
import businessesSagas from "./businesses-saga";
import { authSagas } from "./authSagas";

export default function* rootSaga() {
  yield all([
    watchgetAllErolmentOfAMember(),
    watchgetProgresRecordOfAMember(),
    watchGetMemberList(),
    watchGetMember(),
    watchGetMemberEnrolledInSession(),
    call(authSagas),
    classSagas(),
    businessesSagas(),
  ]);
}

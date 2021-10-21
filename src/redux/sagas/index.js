import { all } from "@redux-saga/core/effects";
import { watchGetClassList } from "./classSagas";
import { watchGetMember, watchGetMemberList } from "./memberSagas";
import { watchGetMemberEnrolledInSession } from "./sessionSagas";

export default function* rootSaga() {
  yield all([
    watchGetClassList(),
    watchGetMemberList(),
    watchGetMember(),
    watchGetMemberEnrolledInSession(),
  ]);
}

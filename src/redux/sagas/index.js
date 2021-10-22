import { all } from "@redux-saga/core/effects";
import { watchGetClassList } from "./classSagas";
import { watchGetClassDefinition } from './classDefinitionSaga';

export default function* rootSaga() {
  yield all([watchGetClassDefinition()]);
}

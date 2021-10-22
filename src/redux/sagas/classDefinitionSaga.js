import {
    put,
    takeEvery,
    call,
  } from "redux-saga/effects";
  
  import getClassDefinition from "../../services/classDefinitionServices";
  import { GET_CLASS_DEFINITION, GET_CLASS_DEFINITION_SAGA } from "../types";
  
  export function* getDefinition(action) {
    const class_list = yield call(getClassDefinition,action.payload);
    yield put({ type: GET_CLASS_DEFINITION, payload: class_list });
  }
  
  //watchingGeneratedFunction
  export function* watchGetClassDefinition() {
    yield takeEvery(GET_CLASS_DEFINITION_SAGA, getDefinition);
  }
  
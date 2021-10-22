import { combineReducers } from "redux";
import classReducers from "./classReducers";
import classDefinitionReducer from './classDefinitionReducer';

const rootReducer = combineReducers({
  //By defining a field inside the reducers parameter
  classes: classReducers,
  definitions: classDefinitionReducer,
});

export default rootReducer;

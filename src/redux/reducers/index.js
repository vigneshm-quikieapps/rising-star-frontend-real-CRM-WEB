import { combineReducers } from "redux";
import classReducer from "./class-reducer";
import authReducer from "./authReducer";

const rootReducer = combineReducers({
  //By defining a field inside the reducers parameter
  classes: classReducer,
  user: authReducer,
});

export default rootReducer;

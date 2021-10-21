import { combineReducers } from "redux";
import classReducers from "./classReducers";
import memberReducers from "./memberReducers";
import sessionReducers from "./sessionReducers";

const rootReducer = combineReducers({
  //By defining a field inside the reducers parameter
  classes: classReducers,
  members: memberReducers,
  sessions: sessionReducers,
});

export default rootReducer;

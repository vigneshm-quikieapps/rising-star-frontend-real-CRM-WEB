import { combineReducers } from "redux";
import authReducer from "./authReducer";
import classReducer from "./class-reducer";
import businessesReducer from "./businesses-reducer";
import memberReducers from "./memberReducers";
import sessionReducers from "./sessionReducers";

const rootReducer = combineReducers({
  //By defining a field inside the reducers parameter
  user: authReducer,
  classes: classReducer,
  businesses: businessesReducer,
  members: memberReducers,
  sessions: sessionReducers,
});

export default rootReducer;

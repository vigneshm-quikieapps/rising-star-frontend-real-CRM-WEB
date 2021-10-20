import { combineReducers } from "redux";
import authReducer from "./authReducer";
import classReducer from "./class-reducer";
import businessesReducer from "./businesses-reducer";

const rootReducer = combineReducers({
  //By defining a field inside the reducers parameter
  user: authReducer,
  classes: classReducer,
  businesses: businessesReducer,
});

export default rootReducer;

import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./auth.reducer";
import appReducer from "./app.reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  app: appReducer,
});

export default rootReducer;

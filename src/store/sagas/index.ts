import { all } from "redux-saga/effects";
import authSaga from "./auth.saga";
import appSaga from "./app.saga";
function* rootSaga() {
  yield all([authSaga(), appSaga()]);
}

export default rootSaga;

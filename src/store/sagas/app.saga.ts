import { takeLatest, put, call, select } from "redux-saga/effects";
import { AppActions, FetchUserAppsAction, Store } from "../../lib/interfaces";
import { appService } from "../../services";
import {
  fetchAppsSuccess,
  fetchAppsFailure,
  fetchUserAppsSuccess,
  fetchUserAppsFailure,
} from "../actions";

function* fetchAppsSaga() {
  try {
    const apps = yield call(appService.fetchApps);
    yield put(fetchAppsSuccess(apps.products, new Date()));
  } catch (error) {
    yield put(fetchAppsFailure(error, "Fetching apps failed"));
  }
}

function* fetchUserAppsSaga(action: FetchUserAppsAction) {
  try {
    const { idToken } = yield select((state: Store) => state.auth);
    const { affiliates: apps } = yield call(
      appService.fetchUserApps,
      idToken,
      action.payload.liveData
    );
    yield put(fetchUserAppsSuccess(apps));
  } catch (error) {
    yield put(fetchUserAppsFailure(error, "Fetching user apps failed"));
  }
}

function* appSaga() {
  yield takeLatest(AppActions.FETCH_APPS as any, fetchAppsSaga);
  yield takeLatest(AppActions.FETCH_USER_APPS as any, fetchUserAppsSaga);
}

export default appSaga;

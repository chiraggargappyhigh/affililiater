import { App, UserAppFetchPayload, Affiliate } from "..";

interface AppState {
  apps: App[];
  userApps: Affiliate[];
  lastFetched: Date | null;
}

enum AppActions {
  FETCH_APPS = "FETCH_APPS",
  FETCH_APPS_SUCCESS = "FETCH_APPS_SUCCESS",
  FETCH_APPS_FAILURE = "FETCH_APPS_FAILURE",

  FETCH_USER_APPS = "FETCH_USER_APPS",
  FETCH_USER_APPS_SUCCESS = "FETCH_USER_APPS_SUCCESS",
  FETCH_USER_APPS_FAILURE = "FETCH_USER_APPS_FAILURE",
}

interface FetchAppsAction {
  type: AppActions.FETCH_APPS;
}

interface FetchAppsSuccessAction {
  type: AppActions.FETCH_APPS_SUCCESS;
  payload: {
    apps: App[];
    lastFetched: Date;
  };
}

interface FetchAppsFailureAction {
  type: AppActions.FETCH_APPS_FAILURE;
  payload: {
    error: string;
  };
}

interface FetchUserAppsAction {
  type: AppActions.FETCH_USER_APPS;
  payload: UserAppFetchPayload;
}

interface FetchUserAppsSuccessAction {
  type: AppActions.FETCH_USER_APPS_SUCCESS;
  payload: {
    apps: Affiliate[];
    lastFetched: Date;
  };
}

interface FetchUserAppsFailureAction {
  type: AppActions.FETCH_USER_APPS_FAILURE;
  payload: {
    error: string;
  };
}

type AppActionTypes =
  | FetchAppsAction
  | FetchAppsSuccessAction
  | FetchAppsFailureAction;

type UserAppActionTypes =
  | FetchUserAppsAction
  | FetchUserAppsSuccessAction
  | FetchUserAppsFailureAction;

export {
  AppState,
  AppActions,
  AppActionTypes,
  FetchAppsAction,
  FetchAppsFailureAction,
  FetchAppsSuccessAction,
  FetchUserAppsAction,
  FetchUserAppsFailureAction,
  FetchUserAppsSuccessAction,
  UserAppActionTypes,
};

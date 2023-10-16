import {
  AppActions,
  FetchAppsAction,
  FetchAppsSuccessAction,
  FetchAppsFailureAction,
  FetchUserAppsAction,
  FetchUserAppsFailureAction,
  FetchUserAppsSuccessAction,
  UserAppFetchPayload,
  App,
} from "../../lib/interfaces";
import { toast } from "react-toastify";

const fetchApps = (): FetchAppsAction => {
  return {
    type: AppActions.FETCH_APPS,
  };
};

const fetchAppsSuccess = (
  apps: App[],
  lastFetched: Date
): FetchAppsSuccessAction => {
  console.log("fetchAppsSuccess", apps);
  return {
    type: AppActions.FETCH_APPS_SUCCESS,
    payload: {
      apps,
      lastFetched,
    },
  };
};

const fetchAppsFailure = (
  error: any,
  errorMsg: string
): FetchAppsFailureAction => {
  toast.error(errorMsg);
  console.log(error);
  return {
    type: AppActions.FETCH_APPS_FAILURE,
    payload: {
      error,
    },
  };
};

const fetchUserApps = (payload: UserAppFetchPayload): FetchUserAppsAction => {
  return {
    type: AppActions.FETCH_USER_APPS,
    payload,
  };
};

const fetchUserAppsSuccess = (apps: App[]): FetchUserAppsSuccessAction => {
  return {
    type: AppActions.FETCH_USER_APPS_SUCCESS,
    payload: {
      apps,
    },
  };
};

const fetchUserAppsFailure = (
  error: any,
  errorMsg: string
): FetchUserAppsFailureAction => {
  toast.error(errorMsg);
  console.log(error);
  return {
    type: AppActions.FETCH_USER_APPS_FAILURE,
    payload: {
      error,
    },
  };
};

export {
  fetchApps,
  fetchAppsSuccess,
  fetchAppsFailure,
  fetchUserApps,
  fetchUserAppsSuccess,
  fetchUserAppsFailure,
};

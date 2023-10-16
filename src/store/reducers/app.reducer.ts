import {
  AppActionTypes,
  UserAppActionTypes,
  AppState,
  AppActions,
} from "../../lib/interfaces";

const initialState: AppState = {
  apps: [],
  userApps: [],
  lastFetched: null,
};

const appReducer = (
  state: AppState = initialState,
  action: AppActionTypes | UserAppActionTypes
): AppState => {
  switch (action.type) {
    case AppActions.FETCH_APPS_SUCCESS:
      return {
        ...state,
        apps: action.payload.apps,
        lastFetched: action.payload.lastFetched,
      };
    case AppActions.FETCH_USER_APPS_SUCCESS:
      return {
        ...state,
        userApps: action.payload.apps,
      };
    case "RESET_STORE":
      return initialState;
    default:
      return state;
  }
};

export default appReducer;

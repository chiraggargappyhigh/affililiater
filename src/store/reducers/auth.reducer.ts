import {
  AuthState,
  AuthActionTypes,
  AuthActions,
  EmptyAction,
} from "../../lib/interfaces";

const initialState: AuthState = {
  user: null,
  idToken: null,
};

const authReducer = (
  state: AuthState = initialState,
  action: AuthActionTypes | EmptyAction
): AuthState => {
  switch (action.type) {
    case AuthActions.LOGIN_USER_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        idToken: action.payload.idToken,
      };
    case AuthActions.LOGIN_USER_FAILURE:
      return {
        ...state,
        user: null,
        idToken: null,
      };
    case AuthActions.LOGOUT_USER:
      return {
        ...state,
        user: null,
        idToken: null,
      };
    case "RESET_STORE":
      return initialState;
    default:
      return state;
  }
};

export default authReducer;

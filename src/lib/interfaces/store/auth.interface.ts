import { User, UserType } from "..";

interface AuthState {
  user?: User | null;
  idToken?: string | null;
}

enum AuthActions {
  LOGIN_USER = "LOGIN_USER",
  LOGIN_USER_SUCCESS = "LOGIN_USER_SUCCESS",
  LOGIN_USER_FAILURE = "LOGIN_USER_FAILURE",

  LOGOUT_USER = "LOGOUT_USER",
}

interface LoginUserAction {
  type: AuthActions.LOGIN_USER;
  payload: {
    googleLogin: boolean;
    email?: string;
    password?: string;
    userType: UserType;
  };
}

interface LoginUserSuccessAction {
  type: AuthActions.LOGIN_USER_SUCCESS;
  payload: {
    user: User;
    idToken: string;
  };
}

interface LoginUserFailureAction {
  type: AuthActions.LOGIN_USER_FAILURE;
  payload: {
    error: string;
  };
}

interface LogoutUserAction {
  type: AuthActions.LOGOUT_USER;
}

type AuthActionTypes =
  | LoginUserAction
  | LoginUserSuccessAction
  | LoginUserFailureAction
  | LogoutUserAction;

export {
  AuthState,
  AuthActions,
  AuthActionTypes,
  LoginUserAction,
  LoginUserFailureAction,
  LoginUserSuccessAction,
  LogoutUserAction,
};

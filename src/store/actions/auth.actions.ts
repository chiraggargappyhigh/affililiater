import {
  AuthActions,
  LoginUserAction,
  LoginUserFailureAction,
  LoginUserSuccessAction,
  LogoutUserAction,
  User,
  UserType,
} from "../../lib/interfaces";
import { toast } from "react-toastify";

const loginUser = (
  userType: UserType,
  googleLogin: boolean = true
): LoginUserAction => {
  return {
    type: AuthActions.LOGIN_USER,
    payload: {
      googleLogin: googleLogin,
      userType,
    },
  };
};

const loginUserSuccess = (
  user: User,
  idToken: string
): LoginUserSuccessAction => {
  return {
    type: AuthActions.LOGIN_USER_SUCCESS,
    payload: {
      user,
      idToken,
    },
  };
};

const loginUserFailure = (
  error: any,
  errorMsg: string
): LoginUserFailureAction => {
  toast.error(errorMsg);
  console.log(error);
  return {
    type: AuthActions.LOGIN_USER_FAILURE,
    payload: {
      error,
    },
  };
};

const logoutUser = (): LogoutUserAction => {
  return {
    type: AuthActions.LOGOUT_USER,
  };
};

export { loginUser, loginUserSuccess, loginUserFailure, logoutUser };

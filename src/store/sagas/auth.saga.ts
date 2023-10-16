import { takeLatest, put, call } from "redux-saga/effects";
import { AuthActions, LoginUserAction } from "../../lib/interfaces";
import { loginUserSuccess, loginUserFailure } from "../actions";

import { firebaseService, userService } from "../../services";

function* loginUserSaga(action: LoginUserAction) {
  try {
    const { userType } = action.payload;
    const { user: firebaseUser } = yield call(firebaseService.signInWithGoogle);
    const { user, accessToken: token } = yield call(
      userService.addOrUpdateUser,
      {
        firebaseUid: firebaseUser.uid,
        type: userType,
        googleToken: firebaseUser.accessToken,
      }
    );
    yield put(loginUserSuccess(user, token));
  } catch (error) {
    yield put(loginUserFailure(error, "Login failed"));
  }
}

function* authSaga() {
  yield takeLatest(AuthActions.LOGIN_USER as any, loginUserSaga);
}

export default authSaga;

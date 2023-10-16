import { firebaseAuth, googleAuthProvider } from "../lib/firebase";
import {
  signInWithPopup,
  onAuthStateChanged,
  onIdTokenChanged,
  getIdToken,
  Auth,
  GoogleAuthProvider,
  User,
} from "firebase/auth";

import { userService } from ".";
import { loginUserSuccess } from "../store/actions";

class FirebaseService {
  private auth: Auth;
  private googleAuthProvider: GoogleAuthProvider;
  constructor() {
    this.auth = firebaseAuth;
    this.googleAuthProvider = googleAuthProvider;

    this.signInWithGoogle = this.signInWithGoogle.bind(this);

    onAuthStateChanged(this.auth, this.onAuthStateChangedCallback);
    onIdTokenChanged(this.auth, this.onIdTokenChangedCallback);
  }

  public async signInWithGoogle(): {
    user: User;
    idToken: string;
  } {
    return await new Promise((resolve, reject) => {
      signInWithPopup(this.auth, new GoogleAuthProvider())
        .then((result) => {
          console.log(GoogleAuthProvider.credentialFromResult(result));
          resolve({
            user: result.user,
            idToken: GoogleAuthProvider.credentialFromResult(result).idToken,
          });
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  private async onAuthStateChangedCallback(firebaseUser) {
    if (!firebaseUser) return;
    //     const { accessToken, uid } = firebaseUser;
    //     const { user, accessToken: token } = await userService.addOrUpdateUser({
    //       firebaseUid: uid,
    //       googleToken: accessToken,
    //     });

    //     const store = await import("../store");
    //     store.default.dispatch(loginUserSuccess(user, token));
  }

  private onIdTokenChangedCallback(user) {
    console.log("onIdTokenChangedCallback", user);
  }

  public getNewIdToken() {
    if (this.auth.currentUser) {
      return getIdToken(this.auth.currentUser);
    } else {
      throw new Error("No user is signed in");
    }
  }
}

export default FirebaseService;

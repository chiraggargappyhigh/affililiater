import FirebaseService from "./firebase.service";
import UserService from "./user.service";
import AppService from "./app.service";

const firebaseService = new FirebaseService();
const userService = new UserService();
const appService = new AppService();

export { firebaseService, userService, appService };

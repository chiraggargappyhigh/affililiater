import { redirect } from "react-router-dom";
import { store } from "../../../store";

const loginLoader = async () => {
  const { auth } = store.getState();
  if (auth.user && auth.idToken) {
    return redirect("/");
  }
  return auth;
};

export default loginLoader;

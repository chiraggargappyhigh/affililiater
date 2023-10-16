import { redirect } from "react-router-dom";
import { store } from "../../../store";

const dashboardLoader = async () => {
  const { auth } = store.getState();
  if (!auth.user || !auth.idToken) {
    return redirect("/login");
  }
  return auth;
};

export default dashboardLoader;

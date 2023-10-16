import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../../Layouts/DashboardLayout";
import DashboardHome from "../../Components/Dashboard";
import Sales from "../../Components/Dashboard/Sales";
import Login from "../../pages/Login";
import dashboardLoader from "./loader/dashboard";
import loginLoader from "./loader/login";
const Router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardLayout />,
    loader: dashboardLoader,
    children: [
      {
        path: "/",
        element: <DashboardHome />,
      },
      {
        path: "/sales",
        element: <Sales />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
    loader: loginLoader,
  },
]);

export default Router;

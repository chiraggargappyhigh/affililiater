import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store/index.ts";
import { RouterProvider } from "react-router-dom";
import Router from "./lib/router/router.tsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ToastContainer
          position={toast.POSITION.BOTTOM_CENTER}
          autoClose={2000}
        />
        <RouterProvider router={Router} />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

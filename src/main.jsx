import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PostContextProvider } from "./context/PostContext.jsx";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <PostContextProvider>
          <Provider store={store}>
            <App />
          </Provider>
        </PostContextProvider>
        <ToastContainer />
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);

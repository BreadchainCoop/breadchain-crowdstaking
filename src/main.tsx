import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import store from "./store";

import App from "./components/App";
import ErrorBoundary from "./components/ErrorBoundary";

import "./css/index.css";

ReactDOM.render(
  <React.StrictMode>
    <ErrorBoundary>
      <Provider store={store}>
        <App />
      </Provider>
    </ErrorBoundary>
  </React.StrictMode>,
  document.getElementById("root")
);

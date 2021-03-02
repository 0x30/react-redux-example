import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import ReactReduxToolkit from "./ReduxToolkit";
import ContextHooks from "./ContextHooks";
import reportWebVitals from "./reportWebVitals";
import ReactRouter from "./RouterDom";
import Animate from "./Animate";

ReactDOM.render(
  <React.StrictMode>
    <App />
    <ReactReduxToolkit />
    <ContextHooks />
    <ReactRouter />
    <Animate />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

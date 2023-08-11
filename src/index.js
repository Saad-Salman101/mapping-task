import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import customReducer from "./redux/Reducers";
import App from "./App";
import './index.css';

const store = configureStore({
  reducer: {
    customer: customReducer,
  },
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

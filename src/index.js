import React from "react";
import { createRoot } from 'react-dom/client';
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import createSagaMiddleware from "redux-saga";
import App from "./App";
import "./styles/custom.scss";

import reducer from "./reducer";
import rootSaga from "./sagas";

const sagaMiddleware = createSagaMiddleware();

const store = createStore(reducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

const container = document.getElementById("root")
const root = createRoot(container)

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

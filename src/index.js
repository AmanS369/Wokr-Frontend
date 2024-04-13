import React from "react";
import ReactDOM from "react-dom/client";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./Redux/store.js";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);

reportWebVitals();

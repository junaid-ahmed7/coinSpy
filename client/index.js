import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import store from "./store/store.ts";

const domNode = document.getElementById("root");
const root = createRoot(domNode);

root.render(
  <>
    <Provider store={store}>
      <App></App>
    </Provider>
  </>
);

import App from "App";
import AppContextProvider from "context/AppContextProvider";
import "index.css";
import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "reportWebVitals";

ReactDOM.render(
  <React.StrictMode>
    <AppContextProvider>
      <App />
    </AppContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();

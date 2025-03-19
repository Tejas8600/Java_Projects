import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { useContext } from "react";
import { AppProvider } from "./Context/Context";
import App from "./App.jsx";
// import { BrowserRouter as Router } from "react-router-dom";
ReactDOM.createRoot(document.getElementById("root")).render(
 
  <React.StrictMode>
    {/* <Router> */}
      <AppProvider>
        <App />
      </AppProvider>
    {/* </Router> */}
  </React.StrictMode>
);

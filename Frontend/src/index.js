import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

// import react router
import { BrowserRouter } from "react-router-dom";

/* ============ import bootstrap ================= */
import "bootstrap/dist/css/bootstrap.min.css";
import "jquery/dist/jquery.min.js";
import "popper.js/dist/umd/popper.min.js";
import "bootstrap/dist/js/bootstrap.min.js";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

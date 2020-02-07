import "core-js/stable";
import "regenerator-runtime/runtime";
import "whatwg-fetch"; // fetch polyfill
import "url-search-params-polyfill"; // URLSearchParams polyfill
import "normalize.css";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import fontawesome from "@fortawesome/fontawesome";
import faSolid from "@fortawesome/fontawesome-free-solid";
import App from "./containers/App";
import "./index.scss";
import "./responsive.scss";

fontawesome.library.add(faSolid);

const app = (
  <Router>
    <App />
  </Router>
);

ReactDOM.render(app, document.getElementById("root"));

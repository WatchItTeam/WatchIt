import React from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import "../css/Tabs.scss";

// this sort function always puts the "All" tab first, then sorts the rest normally
function allFirstComp(a, b) {
  if (a[0] === "All") return -1;
  if (b[0] === "All") return 1;
  return a > b;
}

function Tabs({ links }) {
  return (
    <nav className="tabs">
      <ul>
        {
          Object.entries(links).sort(allFirstComp).map(([name, url]) => (
            <li key={name}>
              <NavLink className="tab-link" to={url}>{name}</NavLink>
            </li>
          ))
        }
      </ul>
    </nav>
  );
}

Tabs.propTypes = {
  // key is name of tab, value is url tab should navigate to
  links: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,
};

export default Tabs;

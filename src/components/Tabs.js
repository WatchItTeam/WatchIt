import React from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import "../css/Tabs.scss";

function Tabs({ links }) {
  return (
    <nav className="tabs">
      <ul>
        {
          Object.entries(links).map(([name, url]) => (
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

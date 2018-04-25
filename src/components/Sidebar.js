import React from "react";
import PropTypes from "prop-types";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import SidebarNavLink from "./SidebarNavLink";
import "../css/Sidebar.scss";

/**
 * Markup for the sidebar
 */
function Sidebar({ isOpen, lists }) {
  return (
    <div id="sidebar" className={isOpen ? "open" : "closed"}>
      <h1 id="logo">WatchIt</h1>

      <nav>
        <SidebarNavLink exact to="/">
          <FontAwesomeIcon icon="home" fixedWidth /> Home
        </SidebarNavLink>
        <SidebarNavLink to="/movies">
          <FontAwesomeIcon icon="film" fixedWidth /> Browse movies
        </SidebarNavLink>
        <SidebarNavLink to="/shows">
          <FontAwesomeIcon icon="tv" fixedWidth /> Browse TV shows
        </SidebarNavLink>
      </nav>

      <div className="divisor" />

      <h2>My lists</h2>
      <SidebarNavLink to="/user/shit/completed">Completed</SidebarNavLink>
      {
        lists.map(list => <SidebarNavLink to={`/list/${list.id}`}>{list.name}</SidebarNavLink>)
      }
    </div>
  );
}

Sidebar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  lists: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
  })).isRequired,
};

export default Sidebar;

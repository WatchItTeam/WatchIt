import React from "react";
import PropTypes from "prop-types";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import SidebarNavLink from "./SidebarNavLink";
import { withUser } from "../Firebase/UserContext";
import "../css/Sidebar.scss";

/**
 * Markup for the sidebar
 */
function Sidebar({ isOpen, user }) {
  let listContent;
  if (user) {
    const { uid } = user;
    listContent = (
      <nav>
        <SidebarNavLink to={`/user/${uid}/watching/`}>Watching</SidebarNavLink>
        <SidebarNavLink to={`/user/${uid}/plan_to_watch/`}>Plan to watch</SidebarNavLink>
        <SidebarNavLink to={`/user/${uid}/completed/`}>Completed</SidebarNavLink>
        <SidebarNavLink to={`/user/${uid}/dropped/`}>Dropped</SidebarNavLink>
      </nav>
    );
  }

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
      {listContent}
    </div>
  );
}

Sidebar.defaultProps = {
  user: null,
};

Sidebar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  user: PropTypes.object,
};

export default withUser(Sidebar);

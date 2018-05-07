import React from "react";
import PropTypes from "prop-types";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import SidebarNavLink from "./SidebarNavLink";
import PosterCardDropTarget from "./PosterCardDropTarget";
import { SignedIn, SignedOut } from "./UserState/UserState";
import "../css/Sidebar.scss";

/**
 * Markup for the sidebar
 */
function Sidebar({ isOpen }) {
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
      <SignedIn>
        {user => (
          <nav>
            <PosterCardDropTarget>
              <SidebarNavLink to={`/user/${user.uid}/watching/`}>
                Watching
              </SidebarNavLink>
            </PosterCardDropTarget>
            <PosterCardDropTarget>
              <SidebarNavLink to={`/user/${user.uid}/plan_to_watch/`}>
                Plan to watch
              </SidebarNavLink>
            </PosterCardDropTarget>
            <PosterCardDropTarget>
              <SidebarNavLink to={`/user/${user.uid}/completed/`}>
                Completed
              </SidebarNavLink>
            </PosterCardDropTarget>
            <PosterCardDropTarget>
              <SidebarNavLink to={`/user/${user.uid}/dropped/`}>
                Dropped
              </SidebarNavLink>
            </PosterCardDropTarget>
            <p>You can add to lists with drag and drop</p>
          </nav>
        )}
      </SignedIn>
      <SignedOut>
        <p>Log in to view your lists</p>
      </SignedOut>
    </div>
  );
}

Sidebar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
};

export default Sidebar;

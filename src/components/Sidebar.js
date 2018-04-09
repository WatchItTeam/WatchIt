import React from "react";
import PropTypes from "prop-types";
import SidebarNavLink from "./SidebarNavLink";
import "../css/Sidebar.scss";

function Sidebar({ lists }) {
  return (
    <div className="sidebar">
      <h1 className="logo">WatchIt</h1>

      <nav>
        <SidebarNavLink exact to="/">
          <i className="fa fa-home fa-fw" /> Home
        </SidebarNavLink>
        <SidebarNavLink to="/movies">
          <i className="fa fa-film fa-fw" /> Browse movies
        </SidebarNavLink>
        <SidebarNavLink to="/shows">
          <i className="fa fa-tv fa-fw" /> Browse TV shows
        </SidebarNavLink>
      </nav>

      <div className="divisor" />

      <h2>My lists</h2>
      {
        lists.map(list => <SidebarNavLink to={`/list/${list.id}`}>{list.name}</SidebarNavLink>)
      }
    </div>
  );
}

Sidebar.propTypes = {
  lists: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
  })).isRequired,
};

export default Sidebar;

import React from "react";
import { NavLink } from "react-router-dom";
import "../css/SidebarNavLink.scss";

function SidebarNavLink(props) {
  return <NavLink {...props} className="sidebar-navlink" activeClassName="active" />;
}

export default SidebarNavLink;

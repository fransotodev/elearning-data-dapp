import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function NavItem({ icon, text, path, style, iconPosition }) {
  return (
    <NavLink className="nav-link" to={path} style={style}>
      {iconPosition === "Right" && <strong>{text}</strong>}
      <FontAwesomeIcon className="mr-1 ml-1" icon={icon} size="lg" />
      {iconPosition === "Left" && <strong>{text}</strong>}
    </NavLink>
  );
}

export default NavItem;

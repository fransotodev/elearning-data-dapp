import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function NavItem({ icon, text, path, style, iconPosition }) {
  const spanStyleLeft = { paddingLeft: "3px" };
  const spanStyleRight = { paddingRight: "3px" };
  return (
    <NavLink className=" nav-item nav-link" to={path} style={style}>
      {iconPosition === "Left" && <FontAwesomeIcon icon={icon} size="lg" />}

      <span style={iconPosition === "Left" ? spanStyleLeft : spanStyleRight}>
        <strong>{text}</strong>
      </span>
      {iconPosition === "Right" && <FontAwesomeIcon icon={icon} size="lg" />}
    </NavLink>
  );
}

export default NavItem;

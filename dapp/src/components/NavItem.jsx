import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
function NavItem({ icon, text, path, style, iconPosition, onClick }) {
  return (
    <NavLink
      onClick={onClick}
      className="nav-link mr-3"
      to={path}
      style={style}
    >
      {iconPosition === "Right" && <strong>{text}</strong>}
      <FontAwesomeIcon className="mr-2 ml-2" icon={icon} size="lg" />
      {iconPosition === "Left" && <strong>{text}</strong>}
    </NavLink>
  );
}

NavItem.propTypes = {
  icon: PropTypes.object,
  text: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  style: PropTypes.object,
  iconPosition: PropTypes.string.isRequired,
};

export default NavItem;

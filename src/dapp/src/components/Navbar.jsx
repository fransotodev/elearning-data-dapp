import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faWallet,
  faMoneyBill,
} from "@fortawesome/free-solid-svg-icons";

/*
import logo from "../market_stand.png";
<img
  src={logo}
  style={{
    width: "46px",
    height: "46px",
    borderRadius: "50%",
    overflow: "hidden",
    marginTop: "-6px",
    backgroundColor: "transparent",
  }}
  alt="Home icon"
></img>

Possible background color: 78f096
*/

function Navbar(props) {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

  return (
    <nav
      className="navbar navbar-expand-lg navbar-light "
      style={{ backgroundColor: "#78f096" }}
    >
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          <FontAwesomeIcon icon={faHome} size="2x" />
        </NavLink>

        <button
          className="navbar-toggler"
          type="button"
          dataToggle="collapse"
          dataTarget="#navbarSupportedContent"
          ariaControls="navbarSupportedContent"
          ariaExpanded={!isNavCollapsed ? true : false}
          ariaLabel="Toggle navigation"
          onClick={handleNavCollapse}
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div
          className={`${isNavCollapsed ? "collapse" : ""} navbar-collapse`}
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link" to="/market">
                <FontAwesomeIcon icon={faMoneyBill} size="lg" />
                <span> </span>
                MarketPlace
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/purchased">
                <FontAwesomeIcon icon={faWallet} size="lg" />
                <span> </span>
                Bought Offers
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

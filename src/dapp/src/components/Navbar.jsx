import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faWallet,
  faMoneyBill,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import NavItem from "./NavItem";

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
      style={{ backgroundColor: "#78f096", height: "55px" }}
    >
      <div className="container-fluid">
        <Link className="navbar-brand" style={{ paddingRight: "30px" }} to="/">
          <FontAwesomeIcon icon={faHome} size="2x" />
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          datatoggle="collapse"
          datatarget="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded={!isNavCollapsed ? true : false}
          aria-label="Toggle navigation"
          onClick={handleNavCollapse}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className={`${isNavCollapsed ? "collapse" : ""} navbar-collapse`}
          id="navbarSupportedContent"
        >
          <div className="navbar-nav me-auto mb-2 mb-lg-0">
            <NavItem
              path={"/market"}
              style={{ paddingRight: "15px" }}
              icon={faMoneyBill}
              text={"Marketplace"}
              iconPosition={"Left"}
            />
            <NavItem
              path={"/purchased"}
              style={{ paddingRight: "15px" }}
              icon={faWallet}
              text={"Purchased"}
              iconPosition={"Left"}
            />
            <NavItem
              path={"/profile"}
              style={{ position: "absolute", right: 5 }}
              icon={faUserCircle}
              text={"Profile"}
              iconPosition={"Right"}
            />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

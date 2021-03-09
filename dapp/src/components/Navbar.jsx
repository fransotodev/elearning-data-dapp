import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faPlusCircle,
  faWallet,
  faMoneyBill,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import NavItem from "./NavItem";

function Navbar() {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm mb-1 ">
      <div className="container">
        <Link className="navbar-brand mr-5" to="/">
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
              path={"/new-offer"}
              icon={faPlusCircle}
              text={"New Offer"}
              iconPosition={"Left"}
              onClick={handleNavCollapse}
            />

            <NavItem
              path={"/market"}
              icon={faMoneyBill}
              text={"Marketplace"}
              iconPosition={"Left"}
              onClick={handleNavCollapse}
            />
            <NavItem
              path={"/purchased"}
              icon={faWallet}
              text={"Purchased"}
              iconPosition={"Left"}
              onClick={handleNavCollapse}
            />
            <NavItem
              path={"/profile"}
              style={{ position: "absolute", right: 5 }}
              icon={faUserCircle}
              text={"Profile"}
              iconPosition={"Right"}
              onClick={handleNavCollapse}
            />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

/*

*/

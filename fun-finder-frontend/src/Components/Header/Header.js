import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage, faEarthAmericas } from "@fortawesome/free-solid-svg-icons";
import "./Header.css";

export default function Header() {
  return (
    <div className="header">
      <ul className="header-list flex-cont">
        <li className="logo">FunFinder</li>
        <div className="flex-cont">
          <li className="nav-link">
            {" "}
            <FontAwesomeIcon
              icon={faEarthAmericas}
              style={{ color: "white" }}
            />
          </li>
          <li className="nav-link">
            <FontAwesomeIcon icon={faMessage} style={{ color: "white" }} />
          </li>
          <li className="prof-btn nav-link">
            <div className="profile-btn"> Profile</div>
          </li>
        </div>
      </ul>
    </div>
  );
}

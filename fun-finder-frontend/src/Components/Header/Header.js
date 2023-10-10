import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage, faEarthAmericas } from "@fortawesome/free-solid-svg-icons";
import "./Header.css";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className="header">
      <ul className="header-list flex-cont">
        <li className="logo">
          <Link to="/">FunFinder</Link>
        </li>
        <div className="flex-cont">
          <li className="nav-link">
            {" "}
            <Link to="events">
              {" "}
              <FontAwesomeIcon
                icon={faEarthAmericas}
                style={{ color: "white" }}
              />
            </Link>
          </li>
          <li className="nav-link">
            <Link to="chat">
              {" "}
              <FontAwesomeIcon icon={faMessage} style={{ color: "white" }} />
            </Link>
          </li>
          <li className="prof-btn nav-link">
            <div className="profile-btn">
              <Link to="profile"> Profile</Link>
            </div>
          </li>
        </div>
      </ul>
    </div>
  );
}

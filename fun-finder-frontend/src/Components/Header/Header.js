import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMessage,
  faEarthAmericas,
  faSignOutAlt,
  faUsersRays,
} from "@fortawesome/free-solid-svg-icons";
import "./Header.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../Utils/AuthProvider";

export default function Header() {
  const { isLoggedIn, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:7000/users/logout");
      document.cookie =
        "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      logout();
    } catch (error) {
      console.error("Błąd wylogowywania:", error.message);
    }
  };
  return (
    <div className="header">
      <ul className="header-list flex-cont">
        <li className="logo">
          <Link to="/" className="nav-a">FunFinder</Link>
        </li>
        {isLoggedIn ? (
          <div className="flex-cont">
            <li className="nav-link">
              <Link to="/battle">
                <FontAwesomeIcon
                  icon={faUsersRays}
                  style={{ color: "white" }}
                />
              </Link>
            </li>
            <li className="nav-link">
              <Link to="/events">
                <FontAwesomeIcon
                  icon={faEarthAmericas}
                  style={{ color: "white" }}
                />
              </Link>
            </li>
            <li className="nav-link">
              <Link to="/chat">
                <FontAwesomeIcon icon={faMessage} style={{ color: "white" }} />
              </Link>
            </li>
            <li className="prof-btn nav-link">
              <div className="profile-login-register-btn">
                <Link to="/profile" className="nav-a"> Profile</Link>
              </div>
            </li>
            <li className="nav-link">
              <Link to="/">
                <FontAwesomeIcon
                  icon={faSignOutAlt}
                  style={{ color: "white" }}
                  onClick={handleLogout}
                />
              </Link>
            </li>
          </div>
        ) : (
          <div className="flex-cont">
            <li className="nav-link">
              <div className="profile-login-register-btn">
                <Link to="/register" className="nav-a"> Zarejestruj</Link>
              </div>
            </li>
            <li className="nav-link">
              <div className="profile-login-register-btn">
                <Link to="/login" className="nav-a"> Zaloguj</Link>
              </div>
            </li>
          </div>
        )}
      </ul>
    </div>
  );
}

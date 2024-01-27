import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMessage,
  faEarthAmericas,
  faSignOutAlt,
  faUsersRays,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import "./Header.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../Utils/AuthProvider";

export default function Header() {
  const { isLoggedIn, logout } = useAuth();
  const [showMenu, setShowMenu] = useState(false);

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

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 767) {
        setShowMenu(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="header">
      <ul className={`header-list ${showMenu ? "active" : ""}`}>
        <li className="logo">
          <Link to="/" className="nav-a"><span onClick={() => setShowMenu(false)}>FunFinder</span></Link>
        </li>
        <div className={`burger-icon ${showMenu ? "active" : ""}`} onClick={() => setShowMenu(!showMenu)}>
          &#9776;
        </div>
        <div className={`mobile-nav ${showMenu ? "active" : ""}`}>
          {isLoggedIn ? (
            <div className="flex-cont">
              {showMenu && <hr />}
              <li className={`nav-link ${showMenu ? "active" : ""}`}>
                <Link to="/search">
                  {showMenu ? (
                    <span onClick={() => setShowMenu(false)}>Znajdź</span>
                  ) : (
                    <FontAwesomeIcon icon={faSearch} style={{ color: "white" }} />
                  )}
                </Link>
                {showMenu && <hr />}
              </li>
              <li className={`nav-link ${showMenu ? "active" : ""}`}>
                <Link to="/battle">
                  {showMenu ? (
                    <span onClick={() => setShowMenu(false)}>EventBattler</span>
                  ) : (
                    <FontAwesomeIcon icon={faUsersRays} style={{ color: "white" }} />
                  )}
                </Link>
                {showMenu && <hr />}
              </li>
              <li className={`nav-link ${showMenu ? "active" : ""}`}>
                <Link to="/events">
                  {showMenu ? (
                    <span onClick={() => setShowMenu(false)}>Wydarzenia</span>
                  ) : (
                    <FontAwesomeIcon icon={faEarthAmericas} style={{ color: "white" }} />
                  )}
                </Link>
                {showMenu && <hr />}
              </li>
              <li className={`nav-link ${showMenu ? "active" : ""}`}>
                <Link to="/chat">
                  {showMenu ? (
                    <span onClick={() => setShowMenu(false)}>Czat</span>
                  ) : (
                    <FontAwesomeIcon icon={faMessage} style={{ color: "white" }} />
                  )}
                </Link>
                {showMenu && <hr />}
              </li>
              <li className={`prof-btn nav-link ${showMenu ? "active" : ""}`}>
                <div className="profile-login-register-btn">
                  <Link to="/profile" className="nav-a"><span onClick={() => setShowMenu(false)}>Profil</span> </Link>
                </div>
                {showMenu && <hr />}
              </li>
              <li className={`nav-link ${showMenu ? "active" : ""}`}>
                <Link to="/">
                  <FontAwesomeIcon
                    icon={faSignOutAlt}
                    style={{ color: "white" }}
                    onClick={() => {
                      handleLogout();
                      setShowMenu(false);
                    }}
                  />
                </Link>
              </li>
            </div>
          ) : (
            <div className="flex-cont">
              <li className={`nav-link ${showMenu ? "active" : ""}`}>
                <div className="profile-login-register-btn">
                  <Link to="/register" className="nav-a"> <span onClick={() => setShowMenu(false)}>Zarejestruj</span></Link>
                </div>
                {showMenu && <hr />}
              </li>
              <li className={`nav-link ${showMenu ? "active" : ""}`}>
                <div className="profile-login-register-btn">
                  <Link to="/login" className="nav-a"> <span onClick={() => setShowMenu(false)}>Zaloguj</span></Link>
                </div>
              </li>
              {showMenu && <hr />}
            </div>
          )}
        </div>
      </ul>
    </div>
  );
}

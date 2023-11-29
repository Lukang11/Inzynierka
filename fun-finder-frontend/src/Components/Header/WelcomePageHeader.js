import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage, faEarthAmericas } from "@fortawesome/free-solid-svg-icons";
import "./Header.css";
import { Link } from "react-router-dom";

export default function WelcomePageHeader() {
    return (
        <div className="header">
            <ul className="header-list flex-cont">
                <li className="logo">
                    <Link to="/">FunFinder</Link>
                </li>
                <div className="flex-cont">
                    <li className="nav-link">
                        <div className="profile-login-register-btn">
                            <Link to="/register"> Zarejestruj</Link>
                        </div>
                    </li>
                    <li className="nav-link">
                        <div className="profile-login-register-btn">
                            <Link to="/login"> Zaloguj</Link>
                        </div>
                    </li>
                </div>
            </ul>
        </div>
    );
}

import React from "react";
import "./WelcomePage.css";
import firstSectionImg from "./Images/first-section-img.png";
import thirdSectionImg from "./Images/third-section-img.png";
import Card from "./Card/Card.js";
import data from "./Card/CardData.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faSquareFacebook,
    faSquareInstagram,
    faSquareTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";
import { useRef } from "react";

function WelcomePage() {
    const ref = useRef(null);

    const cards = data.map(item => {
        return (
            <Card
                key={item.id}
                {...item}

            />
        )
    })

    const scrollToSecondSection = () => {
        ref.current?.scrollIntoView({ behavior: 'smooth' });
    };


    return (
        <div>
            <div className="first-section">
                <div className="container">
                    <div className="left">
                        <div className="section-title">Poznawaj ludzi z<br></br> twoimi zainteresowaniami</div>
                        <div className="section-text">Dzięki spersonalizowanym kategoriom odnajdziesz osoby podobne do Ciebie. Dołącz do nas i nawiązuj nowe znajomości.</div>

                        <div className="buttons-container">
                            <div className="left">
                                <Link to="/register">
                                    <div className="section-filled-btn ">
                                        Stwórz konto
                                    </div>
                                </Link>
                            </div>
                            <div className="right">
                                <div className="section-outline-btn" onClick={scrollToSecondSection}>
                                    Dowiedz się więcej
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="right">
                        <img src={firstSectionImg} className="fullscreenImg" />
                    </div>
                </div>
            </div>

            <div className="second-section" ref={ref}>
                <div className="section-title">Tworzenie profilu. Szybkie i proste</div>
                <div className="section-text">Dopasuj profil do twoich potrzeb. Wybieraj spośród wielu kategorii, opisz siebie i wkrocz w świat wydarzeń! </div>

                <div className="cards-container">{cards}</div>

            </div>


            <div className="third-section">
                <div className="container">
                    <div className="left">
                        <img src={thirdSectionImg} className="fullscreenImg" />
                    </div>

                    <div className="right">
                        <div className="section-title2">Spędź niezapomniane
                            wspólne chwile</div>
                        <div className="section-text2"> Znajdź wydarzenia, które Cię interesują. Dołącz do nich i poznawaj nowych ludzi.  </div>


                    </div>


                </div>
            </div>



            <div className="footer">
                <div className="footer-title">FunFinder</div>
                <div className="footer-text">Copyright © 2024 FunFinder All rights reserved</div>
                {/* <div className="footer-links">
                    <div className="footer-icon">
                        <FontAwesomeIcon icon={faSquareFacebook} />
                    </div>
                    <div className="footer-icon">
                        {" "}
                        <FontAwesomeIcon icon={faSquareInstagram} />
                    </div>
                    <div className="footer-icon">
                        {" "}
                        <FontAwesomeIcon icon={faSquareTwitter} />
                    </div>
                </div> */}
            </div>
        </div>
    );
}

export default WelcomePage;
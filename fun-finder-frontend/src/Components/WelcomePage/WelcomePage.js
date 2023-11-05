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

function WelcomePage() {

    const cards = data.map(item => {
        return (
            <Card
                key={item.id}
                {...item}

            />
        )
    })


    return (
        <div>
            <div className="first-section">
                <div className="container">
                    <div className="left">
                        <div className="section-title">Poznawaj ludzi z<br></br> twoimi zainteresowaniami</div>
                        <div className="section-text">Dolor sit amet, consectetur adipiscing elit. Fusce hendrerit tincidunt libero ut tempor. Duis luctus feugiat tellus non ultrices. Nullam eget iaculis leo. Mauris et tellus est. Nullam quis risus justo. Curabitur luctus sed elit ac vehicula. Dolor sit amet, consectetur adipiscing elit. Fusce hendrerit tincidunt libero ut tempor. </div>

                        <div className="buttons-container">
                            <div className="left">
                                <div className="section-filled-btn ">
                                    Stwórz konto
                                </div>
                            </div>
                            <div className="right">
                                <div className="section-outline-btn">
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

            <div className="second-section">
                <div className="section-title">Tworzenie profilu. Szybkie i proste</div>
                <div className="section-text">Dolor sit amet, consectetur adipiscing elit. Fusce hendrerit tincidunt libero ut tempor. Duis luctus feugiat tellus non ultrices. Nullam eget iaculis leo. Mauris et tellus est. Nullam quis risus justo. Curabitur luctus sed elit ac vehicula. Dolor sit amet, consectetur adipiscing elit. Fusce hendrerit tincidunt libero ut tempor. </div>

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
                        <div className="section-text2">Dolor sit amet, consectetur adipiscing elit. Fusce hendrerit tincidunt libero ut tempor. Duis luctus feugiat tellus non ultrices. Nullam eget iaculis leo. Mauris et tellus est. Nullam quis risus justo. Curabitur luctus sed elit ac vehicula. Dolor sit amet, consectetur adipiscing elit. Fusce hendrerit tincidunt libero ut tempor. </div>


                    </div>


                </div>
            </div>



            <div className="footer">
                <div className="footer-title">FunFinder</div>
                <div className="footer-text">Copyright © 2024 FunFinder All rights reserved</div>
                <div className="footer-links">
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
                </div>
            </div>
        </div>
    );
}

export default WelcomePage;
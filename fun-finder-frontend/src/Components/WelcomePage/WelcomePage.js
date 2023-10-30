import React from "react";
import "./WelcomePage.css";
import firstSectionImg from "./Images/first-section-img.png";
import Button from 'react-bootstrap/Button';


function WelcomePage() {
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
                <h2>hello world!</h2>
            </div>
        </div>
    );
}

export default WelcomePage;
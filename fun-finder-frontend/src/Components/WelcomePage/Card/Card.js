import React from "react";
import "../WelcomePage.css";

function Card(props) {
    return (
        <div className="card">
            <div className="card-title">{props.title}</div>
            <div className="card-text">{props.text}</div>
        </div>

    )
}

export default Card;

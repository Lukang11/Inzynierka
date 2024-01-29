import React from "react";
import "./GooglePlaceSquare.css";
import { useNavigate } from "react-router-dom";

function GooglePlaceSquare({ eventInfo }) {
  const split_address = eventInfo.formattedAddress.split(", ");
  const navigate = useNavigate();
  const navigateToUri = (webUri) => {
    navigate(`${webUri}`);
  };
  return (
    <div className="google-square-cont">
      <a
        className="google-square-link"
        href={eventInfo.websiteUri}
        target="_blank"
      >
        <div className="google-square-header">{eventInfo.displayName.text}</div>
        <div className="google-square-adress">{split_address[0]}</div>
        <div className="google-square-rating">{eventInfo.rating}/5</div>
      </a>
    </div>
  );
}

export default GooglePlaceSquare;

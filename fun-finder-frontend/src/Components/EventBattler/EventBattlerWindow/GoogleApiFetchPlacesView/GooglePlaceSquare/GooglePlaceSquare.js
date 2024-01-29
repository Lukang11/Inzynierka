import React from "react";
import "./GooglePlaceSquare.css";
import { Link, useNavigate } from "react-router-dom";

function GooglePlaceSquare({ eventInfo, isAddedByUser }) {
  const split_address = !isAddedByUser
    ? eventInfo.formattedAddress.split(", ")
    : null;
  const dateEventTimeStart = new Date(eventInfo.eventStart);
  const dateEventTimeEnd = new Date(eventInfo.eventEnd);
  const formattedHourStart = isAddedByUser
    ? dateEventTimeStart.toLocaleDateString("pl-PL", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : null;
  const formattedHourEnd = isAddedByUser
    ? dateEventTimeEnd.toLocaleDateString("pl-PL", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : null;
  const navigate = useNavigate();

  return (
    <div className="google-square-cont">
      {!isAddedByUser ? (
        <a
          className="google-square-link"
          href={eventInfo.websiteUri}
          target="_blank"
        >
          <div className="google-square-header">
            {eventInfo.displayName ? eventInfo.displayName.text : null}
          </div>
          <div className="google-square-adress">{split_address[0]}</div>
          <div className="google-square-rating">
            {eventInfo.rating ? eventInfo.rating : "Brak"}/5
          </div>
        </a>
      ) : (
        <Link
          to={`/event-info/${eventInfo._id}`}
          className="google-square-link"
        >
          <div className="google-square-header">{eventInfo.name}</div>
          <div className="google-square-adress">
            {eventInfo.eventDescription}
          </div>
          <div className="google-square-adress">{formattedHourStart}</div>
          <div className="google-square-adress">{formattedHourEnd}</div>
          <div className="google-square-rating">{eventInfo.location}</div>
        </Link>
      )}
    </div>
  );
}

export default GooglePlaceSquare;

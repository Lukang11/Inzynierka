import React from "react";
import "./EventCardView.css";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

function EventCardView({ eventInfo, places }) {
  const navigate = useNavigate();
  const handleRowClick = (id) => {
    navigate(`/event-info/${id}`);
  };

  return (
    <div
      className="events-view-card"
      onClick={() => handleRowClick(eventInfo._id)}
    >
      <div className="events-view-card-item">
        <div className="events-view-image"></div>
        <div className="events-view-description">
          <div className="events-view-card-item-spec-left">
            {" "}
            <div className="events-info-card-name">
              {places ? eventInfo.displayName.text : eventInfo.name}
            </div>
            <div className="events-info-card-location">
              {places ? eventInfo.formattedAddress : eventInfo.location}
            </div>
          </div>
          <div className="events-view-card-item-spec-right">
            {" "}
            <div className="events-view-card-hour">20:00</div>
            <div className="events-view-card-date">22.12.2023</div>
            <div>
              {places ? (
                <FontAwesomeIcon
                  icon={faStar}
                  style={{ color: "rgb(232, 198, 26)" }}
                />
              ) : null}
              {places ? ` ${eventInfo.rating}` : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventCardView;

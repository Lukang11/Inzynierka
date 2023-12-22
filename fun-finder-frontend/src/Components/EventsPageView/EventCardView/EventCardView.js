import React from "react";
import "./EventCardView.css";
import { useNavigate } from "react-router-dom";

function EventCardView({ eventInfo }) {
  const navigate = useNavigate();
  const handleRowClick = (id) => {
    navigate(`/event-info/${id}`);
  };

  return (
    <div
      className="events-view-card"
      onClick={() => handleRowClick(eventInfo._id)}
    >
      {console.log(eventInfo)}
      <div className="events-view-card-item">
        <div className="events-view-image"></div>
        <div className="events-view-description">
          <div className="events-view-card-item-spec-left">
            {" "}
            <div className="events-info-card-name">{eventInfo.name}</div>
            <div className="events-info-card-location">
              {eventInfo.location}
            </div>
          </div>
          <div className="events-view-card-item-spec-right">
            {" "}
            <div className="events-view-card-hour">20:00</div>
            <div className="events-view-card-date">22.12.2023</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventCardView;

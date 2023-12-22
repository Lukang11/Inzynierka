import React from "react";
import "./EventCardView.css";

function EventCardView({ eventInfo }) {
  return (
    <div className="events-view-card">
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

import React from "react";
import "./EventCardView.css";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

function EventCardView({ eventInfo, places }) {
  const navigate = useNavigate();
  console.log(eventInfo)

  const splitDateTime = (dateTime) => {
    if (!dateTime) return { date: '', time: '' };

    const [date, time] = dateTime.split('T');
    const formattedDate = date.split('-').reverse().join('.');
    const formattedTime = time.substring(0, 5);

    return { date: formattedDate, time: formattedTime };
  };

 
  const { date, time } = splitDateTime(eventInfo.eventStart);
  console.log({date, time});

  const handleRowClick = (id) => {
    navigate(`/event-info/${id}`);
  };

  return (
    <div
      className="events-view-card"
      onClick={() => handleRowClick(eventInfo._id)}
    >
      <div className="events-view-card-item">
        <div className="events-view-image" style={{
          backgroundImage: eventInfo.eventPhoto ? `url(${eventInfo.eventPhoto})` : 'url(https://www.thermaxglobal.com/wp-content/uploads/2020/05/image-not-found.jpg)'
        }}>
        </div>
        <div className="events-view-description">
          <div className="events-view-card-item-spec-left">
            <div className="events-info-card-name">
              {places ? eventInfo.displayName.text : eventInfo.name}
            </div>
            <div className="events-info-card-location">
              {places ? eventInfo.formattedAddress : eventInfo.location}
            </div>
          </div>
          <div className="events-view-card-item-spec-right">
            <div className="events-view-card-hour">{time}</div>
            <div className="events-view-card-date">{date}</div>
            <div>
              {places && (
                <>
                  <FontAwesomeIcon
                    icon={faStar}
                    style={{ color: "rgb(232, 198, 26)" }}
                  />
                  {` ${eventInfo.rating}`}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventCardView;

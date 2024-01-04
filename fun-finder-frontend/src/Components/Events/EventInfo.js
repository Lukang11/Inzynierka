import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./EventInfo.css";

export const EventInfo = () => {
  const { id } = useParams();
  const [eventData, setEventData] = useState(null);

  const fetchEventData = async () => {
    try {
      const response = await fetch(`http://localhost:7000/events/by-id/${id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setEventData(data);
    } catch (error) {
      console.error('Error fetching event data:', error);
    }
  };

  return (
    <div className="event-info-container">
      {eventData ? (
        <>
          <div className="overlap">
            <p className="event-information">{eventData.description}</p>
          </div>
          <div className="event-map-container">
            <iframe
              className='event-map'
              src={eventData.mapUrl}
              width=""
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
          <div className="event-name">{eventData.name}</div>
          <div className="event-address">{eventData.address}</div>
          <p className="event-enrolled-users">
            <span className="enrolled-users">Zapisanych uczestników: </span>
            <span className="event-number-of-users">{eventData.numberOfUsers}</span>
          </p>
        </>
      ) : (
        <p>Ładowanie danych...</p>
      )}
    </div>
  );
};

export default EventInfo;

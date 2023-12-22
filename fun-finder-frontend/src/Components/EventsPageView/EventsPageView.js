import axios from "axios";
import React, { useEffect, useState } from "react";
import EventCardView from "./EventCardView/EventCardView";
import "./EventsPageView.css";
import { useNavigate } from "react-router-dom";

function EventsPageView() {
  const [events, setEvents] = useState();
  const [error, setError] = useState();
  const [location, setLocation] = useState(null);
  const navigate = useNavigate();
  const url = "http://localhost:7000/events";
  const fetchEvents = () => {
    axios.get(url).then((response) => {
      setEvents(() => response.data);
    });
  };
  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLocation({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
          },
          (error) => {
            setError(error.message);
          }
        );
      } else {
        setError("Geolocation is not supported by your browser");
      }
    };

    getLocation();
  }, []);

  return (
    <div>
      <div>
        {console.log(location)}
        <div className="event-button-group">
          <button className="events-button-fillter">Filtruj</button>
          <button
            className="events-button-add-events"
            onClick={() => navigate("/create-event")}
          >
            Dodaj +
          </button>
        </div>
        <h2>Wydarzenia</h2>
      </div>
      <div className="events-view-container">
        {events
          ? events.map((event) => <EventCardView eventInfo={event} />)
          : "Couldnt fetch events at the moment, try later"}
      </div>
    </div>
  );
}

export default EventsPageView;

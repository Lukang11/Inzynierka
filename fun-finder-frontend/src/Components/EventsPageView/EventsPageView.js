import React, { useEffect, useState } from "react";
import "./EventsPageView.css";
import { useNavigate } from "react-router-dom";
import AllEventComponent from "./AllEventComponent/AllEventComponent";
import NearbyEventsComponent from "./NearbyEventsComponent/NearbyEventsComponent";

function EventsPageView() {
  const [error, setError] = useState();
  const [location, setLocation] = useState(null);
  const navigate = useNavigate();

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
        <h2 className="event-view-title">Wydarzenia</h2>
        <div className="event-view-title-desc">
          Szukasz nowych wrażeń? Nuda dopadła? Dołącz do jednego z wydarzeń!
        </div>
      </div>
      <div className="events-view-container">
        <AllEventComponent />
      </div>
      <h3 className="event-view-title">
        Wydarzenia którę mogą ci się spodobać
      </h3>
      <div className="event-view-title-desc">
        A może to co wiemy, że lubisz ?
      </div>
      <div className="events-view-container">
        <NearbyEventsComponent />
      </div>
      <h3 className="event-view-title">Miejsca warte odwiedzenia</h3>
      <div className="event-view-title-desc">
        Wiemy co misie lubią najbardziej :)
      </div>
      <div className="events-view-container">
        <NearbyEventsComponent />
      </div>
    </div>
  );
}

export default EventsPageView;

import React, { useEffect, useState } from "react";
import "./EventsPageView.css";
import { useNavigate } from "react-router-dom";
import AllEventComponent from "./AllEventComponent/AllEventComponent";
import NearbyEventsComponent from "./PreferedEvents/NearbyEventsComponent";
import HiglyRatedPlaces from "./Restaruants/Restaurants";
import Restaurants from "./Restaruants/Restaurants";

function EventsPageView() {
  const [error, setError] = useState();
  const [userlocation, setUserLocation] = useState(null);
  const navigate = useNavigate();
  const [filter, setFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };
  const handleDateFilterChange = (newDateFilter) => {
    setDateFilter(newDateFilter);
  };
  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setUserLocation({
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
        {console.log(userlocation)}
        <div className="event-button-group">
          <select onChange={(e) => handleFilterChange(e.target.value)}>
            <option value="">Wszystkie</option>
            <option value="20">Do 20 km</option>
            <option value="50">Do 50 km</option>
          </select>
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
        <AllEventComponent
          filter={filter}
          userLocation={userlocation}
          dateFilter={dateFilter}
        />
      </div>
      <h3 className="event-view-title">
        Wydarzenia którę mogą ci się spodobać
      </h3>
      <div className="event-view-title-desc">
        A może to co wiemy, że lubisz ?
      </div>
      <div className="events-view-container">
        <NearbyEventsComponent
          filter={filter}
          userLocation={userlocation}
          dateFilter={dateFilter}
        />
      </div>
      <h3 className="event-view-title">Miejsca warte odwiedzenia</h3>

      <div className="event-view-title-desc">Restaruacje blisko ciebie :)</div>
      <div className="events-view-container">
        <Restaurants />
      </div>
    </div>
  );
}

export default EventsPageView;

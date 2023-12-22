import axios from "axios";
import React, { useEffect, useState } from "react";
import EventCardView from "./EventCardView/EventCardView";
import "./EventsPageView.css";

function EventsPageView() {
  const [events, setEvents] = useState();
  const [error, setError] = useState();
  const url = "http://localhost:7000/events";
  const fetchEvents = () => {
    axios.get(url).then((response) => {
      setEvents(() => response.data);
    });
  };
  useEffect(() => {
    fetchEvents();
  }, []);
  return (
    <div>
      <div>
        <h2>Wydarzenia</h2>
        <div>
          <button className="">Filtruj</button>
          <button className="">Dodaj Wydarzenia</button>
        </div>
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

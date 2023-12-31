import React, { useEffect, useState } from "react";
import axios from "axios";
import EventCardView from "../EventCardView/EventCardView";
import "./NearbyEventsComponent.css";

function NearbyEventsComponent() {
  const [events, setEvents] = useState();
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
    <div className="all-events-component">
      {" "}
      {events
        ? events.map((event) => (
            <EventCardView eventInfo={event} places={false} />
          ))
        : "Couldnt fetch events at the moment, try later"}
    </div>
  );
}

export default NearbyEventsComponent;

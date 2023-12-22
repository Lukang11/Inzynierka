import React from "react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import EventCardView from "../EventCardView/EventCardView";
import "./NearbyEventsComponent.css";

function HiglyRatedPlaces() {
  const [palces, setPlaces] = useState();
  const url = "http://localhost:7000/events";
  const fetchEvents = () => {
    axios.get(url).then((response) => {
      setPlaces(() => response.data);
    });
  };
  useEffect(() => {
    fetchEvents();
  }, []);
  return (
    <div className="all-events-component">
      {" "}
      {palces
        ? events.map((palce) => <EventCardView eventInfo={palce} />)
        : "Couldnt fetch events at the moment, try later"}
    </div>
  );
}

export default HiglyRatedPlaces;

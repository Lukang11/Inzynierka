import React, { useEffect, useState } from "react";
import axios from "axios";
import EventCardView from "../EventCardView/EventCardView";

function HiglyRatedPlaces() {
  const [palces, setPlaces] = useState();
  const url = "http://localhost:7000/events/places/top-rating";
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
        ? palces.map((palce) => (
            <EventCardView eventInfo={palce} places={true} />
          ))
        : "Couldnt fetch events at the moment, try later"}
    </div>
  );
}

export default HiglyRatedPlaces;

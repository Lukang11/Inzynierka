import React, { useEffect, useState } from "react";
import axios from "axios";
import EventCardView from "../EventCardView/EventCardView";

function Restaurants() {
  const [palces, setPlaces] = useState();
  const [position, setPosition] = useState({ latitude: null, longitude: null });
  const url = "http://localhost:7000/events/find-places-by-localization";
  const fetchEvents = (latitude_f, longitude_f) => {
    axios
      .post(url, {
        includedTypes: ["restaurant"],
        locationRestriction: {
          circle: {
            center: {
              latitude: latitude_f,
              longitude: longitude_f,
            },
            radius: 3000,
          },
        },
      })
      .then((response) => {
        setPlaces(() => response.data);
      });
  };

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        fetchEvents(position.coords.latitude, position.coords.longitude);
      });
    } else {
      console.log("Geolocation is not available in your browser.");
    }
  }, []);

  return (
    <div className="all-events-component">
      {palces
        ? palces.places.map((palce, index) => (
            <EventCardView eventInfo={palce} places={true} key={index} />
          ))
        : "Couldnt fetch events at the moment, try later"}
    </div>
  );
}

export default Restaurants;

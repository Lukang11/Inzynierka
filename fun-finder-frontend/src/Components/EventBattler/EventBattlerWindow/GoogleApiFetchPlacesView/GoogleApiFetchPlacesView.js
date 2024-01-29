import React, { useEffect, useState } from "react";
import "./GoogleApiFetchPlacesView.css";
import axios from "axios";
import EventCardView from "../../../EventsPageView/EventCardView/EventCardView";
import GooglePlaceSquare from "./GooglePlaceSquare/GooglePlaceSquare";

function GoogleApiFetchPlacesView({ data }) {
  const [palces, setPlaces] = useState();
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
            radius: 5000,
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
        if (data.length === 0) {
          fetchEvents(position.coords.latitude, position.coords.longitude);
        }
      });
    } else {
      console.log("Geolocation is not available in your browser.");
    }
  }, []);
  return (
    <div className="google-api-view">
      {console.log(data.length)}
      {data.length === 0 ? (
        <div className="event-battler-container-for-places">
          <h4>
            Niestety nie znaleźlismy żadnych miejsc które by do was pasowały
          </h4>
          <div>Może coś z tych miejsc cie zainteresuje?</div>
          <div className="google-api-places-view-wrapper">
            {palces
              ? palces.places.map((palce) => (
                  <GooglePlaceSquare
                    eventInfo={palce}
                    places={true}
                    key={palce._id}
                  />
                ))
              : "Couldnt fetch events at the moment, try later"}
          </div>
        </div>
      ) : (
        <div>
          <div>Udało nam się znaleść takie miejsca:</div>
          <div className="google-api-places-view-wrapper">
            {" "}
            {data.map((place) => (
              <GooglePlaceSquare eventInfo={place} key={place._id} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default GoogleApiFetchPlacesView;

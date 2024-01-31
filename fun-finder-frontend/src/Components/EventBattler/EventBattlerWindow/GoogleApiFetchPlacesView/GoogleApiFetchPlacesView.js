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
      {data.length === 0 ? (
        <div className="event-battler-container-for-places">
          <h3>Niestety nie znaleźlismy żadnych które do was by pasowały</h3>
          <div>Więc wyszukalismy kilka restaruacji w waszej okolicy.</div>
          <div>Smacznego!</div>
          <div className="google-api-places-view-wrapper">
            {palces
              ? palces.places.sort((a, b) => b.rating - a.rating)
              .map((palce) => (
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
          <div>
            <h3>Udało się!</h3>
            <div>
              Na podstawie tego co was łączy udało nam się dopasować kilka
              miejsc.
            </div>
            <div>Miłej zabawy !</div>
          </div>
          <div className="event-places-cont-wrapper">
            <div className="google-api-places-view-wrapper">
              <h3>Miejsca dopasowane do preferencji</h3>
                {data.placesWithTags
                  .sort((a, b) => b.rating - a.rating)
                  .map((place) => (
                    <GooglePlaceSquare
                      eventInfo={place}
                      key={place._id}
                      isAddedByUser={false}
                    />
                  ))}
            </div>
            {data.eventWithTags ? (
              <div className="google-api-places-view-wrapper">
                <h3>Wydarzenia utworzone przez użytkowników</h3>
                {data.eventWithTags.map((event) => (
                  <div>
                    <GooglePlaceSquare
                      eventInfo={event}
                      key={event._id}
                      isAddedByUser={true}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <h3 className="event-battler-not-found">
                Niestety nie udało nam się znaleźć odpowiednich wydarzeń
              </h3>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default GoogleApiFetchPlacesView;

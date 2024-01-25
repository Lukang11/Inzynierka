import React, { useEffect, useState } from "react";
import "./GoogleApiFetchPlacesView.css";
import axios from "axios";
import EventCardView from "../../../EventsPageView/EventCardView/EventCardView";
import GooglePlaceSquare from "./GooglePlaceSquare/GooglePlaceSquare";

function GoogleApiFetchPlacesView({ data }) {
  const [palces, setPlaces] = useState();
  const url = "http://localhost:7000/events/find-places-by-localization";
  const mock = [
    {
      _id: "656f8cf1a410a1eacfeb7603",
      types: [
        "restaurant",
        "bar",
        "food",
        "point_of_interest",
        "establishment",
      ],
      formattedAddress:
        "Bulwar Nadmorski im.Feliksa Nowowiejskiego 2, 81-371 Gdynia, Poland",
      websiteUri: "http://browarportgdynia.com/",
      displayName: {
        text: "Browar Port Gdynia",
        languageCode: "en",
        _id: "656f8cf1a410a1eacfeb7604",
      },
      iconMaskBaseUri:
        "https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet",
      rating: 4.2,
      __v: 0,
    },
    {
      _id: "656f8e5fa410a1eacfeb765d",
      types: [
        "seafood_restaurant",
        "restaurant",
        "food",
        "bar",
        "point_of_interest",
        "establishment",
      ],
      formattedAddress: "Orłowska 3, 81-522 Gdynia, Poland",
      websiteUri: "http://www.tawernaorlowska.pl/",
      displayName: {
        text: "Tawerna Orłowska",
        languageCode: "en",
        _id: "656f8e5fa410a1eacfeb765e",
      },
      iconMaskBaseUri:
        "https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet",
      rating: 4.1,
      __v: 0,
    },
  ];
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
        <div>
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
          {data.map((place) => (
            <GooglePlaceSquare eventInfo={place} key={place._id} />
          ))}
        </div>
      )}
    </div>
  );
}

export default GoogleApiFetchPlacesView;

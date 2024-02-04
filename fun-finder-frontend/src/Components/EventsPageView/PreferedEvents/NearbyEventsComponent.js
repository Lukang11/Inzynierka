import React, { useEffect, useState } from "react";
import axios from "axios";
import EventCardView from "../EventCardView/EventCardView";
import "./NearbyEventsComponent.css";
import { useAuth } from "../../../Utils/AuthProvider";

function PreferedEvents({ userLocation, filter }) {
  const { user } = useAuth();
  const userEmail = user.email;
  const [events, setEvents] = useState([]);
  const [userHobbies, setUserHobbies] = useState([]);
  const eventsUrl = "http://localhost:7000/events";
  const userHobbiesUrl = `http://localhost:7000/users/user-hobbies-names/${userEmail}`;

  function calculateDistance(lat1, lon1, lat2, lon2) {
    const toRadians = (degree) => degree * (Math.PI / 180);

    const R = 6371;

    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(lat1)) *
        Math.cos(toRadians(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userHobbiesResponse = await axios.get(userHobbiesUrl);
        const userHobbiesData = userHobbiesResponse.data.hobbiesNames;
        console.log(userHobbiesData);

        const eventsResponse = await axios.get(eventsUrl);
        const allEvents = eventsResponse.data;

        const filteredEvents = filterEvents(
          allEvents,
          filter,
          userLocation,
          userHobbiesData
        );
        setEvents(filteredEvents);
        console.log(filteredEvents);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [userEmail, filter, userLocation]);

  const filterEvents = (events, filter, userLocation, userHobbiesData) => {
    return events.filter((event) => {
      // Sprawdzanie pasujących hobby
      const isHobbyMatch =
        Array.isArray(event.relatedHobbiesName) &&
        event.relatedHobbiesName.some((hobby) =>
          userHobbiesData.includes(hobby)
        );

      // Wykluczenie wydarzeń bez danych geolokalizacyjnych, jeśli filtr jest aktywny
      if (
        filter &&
        (!event.geoLocation ||
          !event.geoLocation.latitude ||
          !event.geoLocation.longitude)
      ) {
        return false;
      }

      // Sprawdzanie odległości, jeśli filtr i lokalizacja są dostępne
      if (filter && userLocation && event.geoLocation) {
        const distance = calculateDistance(
          userLocation.latitude,
          userLocation.longitude,
          event.geoLocation.latitude,
          event.geoLocation.longitude
        );

        const maxDistance = parseFloat(filter);
        return isHobbyMatch && distance <= maxDistance;
      }

      return isHobbyMatch;
    });
  };

  return (
    <div className="all-events-component">
      {events.length > 0 ? (
        events.map((event) => (
          <EventCardView key={event._id} eventInfo={event} places={false} />
        ))
      ) : (
        <p>Brak eventów pasujących do Twoich zainteresowań</p>
      )}
    </div>
  );
}

export default PreferedEvents;
import React, { useEffect, useState } from "react";
import axios from "axios";
import EventCardView from "../EventCardView/EventCardView";
import "./AllEventComponent.css";

function calculateDistance(lat1, lon1, lat2, lon2) {
  const toRadians = (degree) => degree * (Math.PI / 180);

  const R = 6371; // Radius of the Earth in kilometers

  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // Distance in kilometers
}

function AllEventComponent({ filter},{userLocation}) {
  const [events, setEvents] = useState();
  const url = "http://localhost:7000/events";


  const filterEvents = (events) => {
    const currentDate = new Date();
    return events.filter((event) => {
      const eventDate = new Date(event.eventStart);
      if (eventDate < currentDate) return false;
      if (filter && userLocation) {
        const distance = calculateDistance(
          userLocation.latitude,
          userLocation.longitude,
          event.geoLocation.latitude,
          event.geoLocation.longitude
        );
        return distance <= filter.maxDistance;
      }
      return true;
    });
  };

  const fetchEvents = () => {
    axios.get(url).then((response) => {
      const filteredEvents = filterEvents(response.data);
      setEvents(filteredEvents);
    })
    .catch(error => {
      console.error("Error fetching events:", error);
     
    });
  };

  
  useEffect(() => {
    fetchEvents();
  }, [filter, userLocation]);

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

export default AllEventComponent;

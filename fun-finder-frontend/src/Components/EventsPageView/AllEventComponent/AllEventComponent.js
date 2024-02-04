import React, { useEffect, useState } from "react";
import axios from "axios";
import EventCardView from "../EventCardView/EventCardView";
import "./AllEventComponent.css";

function calculateDistance(lat1, lon1, lat2, lon2) {
  const toRadians = (degree) => degree * (Math.PI / 180);

  const R = 6371; 

  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; 
}

function AllEventComponent({ filter, userLocation }) {
  const [events, setEvents] = useState([]);
  const url = "http://localhost:7000/events";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        const allEvents = response.data;

        const filteredEvents = filterEvents(allEvents, filter, userLocation);

        setEvents(filteredEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchData();
  }, [filter, userLocation]);

  const filterEvents = (events, filter, userLocation) => {
    const currentDate = new Date();
    return events.filter((event) => {
      const eventDate = new Date(event.eventStart);
      if (eventDate < currentDate) return false;
  
      
      if (filter && userLocation) {
       
        if (!event.geoLocation || !event.geoLocation.latitude || !event.geoLocation.longitude) {
          
          return false;
        }
  
        const userLat = parseFloat(userLocation.latitude);
        const userLong = parseFloat(userLocation.longitude);
        const eventLat = parseFloat(event.geoLocation.latitude);
        const eventLong = parseFloat(event.geoLocation.longitude);
        const distance = calculateDistance(userLat, userLong, eventLat, eventLong);
        return distance <= parseFloat(filter);
      }
  
      
      return true; 
    });
  };
  
  
  
  

  return (
    <div className="all-events-component">
      {events.length > 0 ? (
        events.map((event) => (
          <EventCardView eventInfo={event} places={false} key={event._id} />
        ))
      ) : (
        "Nie ma żadnych wydarzeń z twoimi prefrencjami"
      )}
    </div>
  );
}
export default AllEventComponent;

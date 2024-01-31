import React, { useEffect, useState } from "react";
import axios from "axios";
import EventCardView from "../EventCardView/EventCardView";
import "./NearbyEventsComponent.css";
import { useAuth } from "../../../Utils/AuthProvider";

function NearbyEventsComponent({ userLocation }) {
  const { user } = useAuth();
  const userEmail = user.email;
  const [events, setEvents] = useState([]);
  const [userHobbies, setUserHobbies] = useState([]);
  const eventsUrl = "http://localhost:7000/events";
  const userHobbiesUrl = `http://localhost:7000/users/user-hobbies-names/${userEmail}`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userHobbiesResponse = await axios.get(userHobbiesUrl);
        const userHobbiesData = userHobbiesResponse.data.hobbiesNames;
        console.log(userHobbiesData)

        const eventsResponse = await axios.get(eventsUrl);
        const allEvents = eventsResponse.data;

      
        const filteredEvents = filterEvents(allEvents, userHobbiesData);

        setEvents(filteredEvents);
        console.log(filteredEvents)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [userEmail]);

  const filterEvents = (events, userHobbiesData) => {
    return events.filter((event) =>
      Array.isArray(event.relatedHobbiesName) && event.relatedHobbiesName.some((hobby) => userHobbiesData.includes(hobby))
    );
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

export default NearbyEventsComponent;

import React, { useEffect, useState } from "react";
import "./ProfileUserEvents.css";
import axios from "axios";
import { useAuth } from "../../../../Utils/AuthProvider";
import EventCell from "./EventCell";

const ProfileUserEvents = () => {
  // const [eventsData, setEventsData] = useState();
  // const { user } = useAuth();
  // const url = "http://localhost:7000/events/event/";
  // useEffect(() => {
  //   const fetchData = async () => {
  //     if (user && user.email) {
  //       try {
  //         const events = await axios.get(`${url}${user.email}`);
  //         setEventsData(events.data);
  //       } catch (error) {
  //         console.error("Error fetching events:", error);
  //       }
  //     }
  //   };

  //   fetchData();
  // }, [user]);

  const eventsData = [
    {
      id: 1,
      event_time_start: "2023/01/01 18:00",
      event_time_end: "2023-01-01 12:00",
      event_name: "Seans filmowy chłopi",
      event_location: "Kino Helios Forum",
      event_person_count: 20,
    },
    {
      id: 2,
      event_time_start: "2023/01/20 11:00",
      event_time_end: "2023-01-01T12:00:00",
      event_name: "Turniej szachowy",
      event_location: "Cafe Luis",
      event_person_count: 20,
    },
    {
      id: 3,
      event_time_start: "2023/02/18 20:30",
      event_time_end: "2023-01-01T12:00:00",
      event_name: "Seans filmowy Napoleon",
      event_location: "Kino Helios Forum",
      event_person_count: 20,
    },
  ];


  return (
    <div>
      {console.log(eventsData)}
      <div className="events-profile-card">
        <h2 className="events-title">Twoje wydarzenia</h2>
        <ul>
  
          {console.log(eventsData)}
          {eventsData.map((element, index) => (
            <EventCell key={index} element={element} index={index} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProfileUserEvents;

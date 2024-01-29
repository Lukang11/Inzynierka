import React, { useEffect, useState } from "react";
import "./ProfileUserEvents.css";
import axios from "axios";
import { useAuth } from "../../../../Utils/AuthProvider";
import EventCell from "./EventCell";

const ProfileUserEvents = () => {
  const [eventsData, setEventsData] = useState();
  const { user } = useAuth();
  const url = "http://localhost:7000/events/event/";

  useEffect(() => {
    const fetchData = async () => {
      if (user && user.email) {
        try {
          const events = await axios.get(`${url}${user.email}`);
          setEventsData(events.data);
          console.log(eventsData)
        } catch (error) {
          console.error("Error fetching events:", error);
        }
      }
    };

    fetchData();
  }, [user]);

  return (
    <div>
      {console.log(eventsData)}
      <div className="events-profile-card">
        <h2 className="events-title">Twoje wydarzenia</h2>
        <ul>
          {console.log(eventsData)}
          {eventsData ? (
            eventsData.map((element, index) => (
              <EventCell key={index} element={element} index={index} />
            ))
          ) : (
            <p>Ładowanie...</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default ProfileUserEvents;

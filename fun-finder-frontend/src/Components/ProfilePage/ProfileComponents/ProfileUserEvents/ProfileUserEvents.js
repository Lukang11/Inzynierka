import React, { useEffect, useState } from "react";
import "./ProfileUserEvents.css";
import axios from "axios";
import { useAuth } from "../../../../Utils/AuthProvider";
import EventCell from "./EventCell";
import { Link } from "react-router-dom";

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
      <div className="events-profile-card">
        <h2 className="events-title">Twoje wydarzenia</h2>
        <ul>
          {eventsData && eventsData.length > 0 ? (
            eventsData.map((element, index) => (
              <EventCell key={index} element={element} index={index} />
            ))
          ) : (
            <span>Nie dołączyłeś(aś) do żadnych wydarzeń, kliknij <Link to="/events">tutaj</Link> aby to zmienić</span> 
          )}
        </ul>
      </div>
    </div>
  );  
};

export default ProfileUserEvents;

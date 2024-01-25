import axios from "axios";
import React, { useEffect, useState } from "react";
import "./EventBattlerWindow.css";
import EventBattlerOneUserView from "./EventBattlerOneUserView/EventBattlerOneUserView";
import EventBattlerMoreUserView from "./EventBattlerMoreUserView/EventBattlerMoreUserView";

function EventBattlerWindow({ participants }) {
  const url_battle = "http://localhost:7000/battle";
  const url_tags = "http://localhost:7000/events/places_types";
  const [apiTags, setApiTags] = useState();

  useEffect(() => {
    const fetchData = async () => {
      if (participants.length > 0) {
        try {
          const response = await axios.post(url_battle, { participants });
        } catch (error) {
          console.error(error);
        }
      }
    };
    const fetchApiTags = async () => {
      try {
        const response = await axios.get(url_tags);
        console.log(response.data);
      } catch (error) {}
    };

    fetchData();
    fetchApiTags();
  }, [participants]);
  return (
    <div className="event-battler-window">
      {participants.length === 0 || participants.length === 1 ? (
        <EventBattlerOneUserView />
      ) : (
        <EventBattlerMoreUserView participants={participants} />
      )}
    </div>
  );
}

export default EventBattlerWindow;

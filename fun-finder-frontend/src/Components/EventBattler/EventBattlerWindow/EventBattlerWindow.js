import axios from "axios";
import React, { useEffect, useState } from "react";

function EventBattlerWindow({ participants }) {
  const url_battle = "http://localhost:7000/battle";
  const url_tags = "http://localhost:7000/events/places_types";
  const [apiTags, setApiTags] = useState();

  useEffect(() => {
    const fetchData = async () => {
      if (participants.length > 0) {
        console.log(participants);
        try {
          console.log(participants);
          const response = await axios.post(url_battle, { participants });
          console.log(response.data);
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
  return <div>EventBattlerWindow</div>;
}

export default EventBattlerWindow;

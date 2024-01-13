import axios from "axios";
import React, { useEffect, useState } from "react";

function EventBattlerWindow({ participants }) {
  const url = "http://localhost:7000/battle";
  const [participantsHobbies, setParticipantsHobbies] = useState();

  useEffect(() => {
    const fetchData = async () => {
      if (participants.length > 0) {
        console.log(participants);
        try {
          console.log(participants);
          const response = await axios.post(url, { participants });
          console.log(response.data);
        } catch (error) {
          console.error(error);
        }
      }
    };

    fetchData();
  }, [participants]);
  return <div>EventBattlerWindow</div>;
}

export default EventBattlerWindow;

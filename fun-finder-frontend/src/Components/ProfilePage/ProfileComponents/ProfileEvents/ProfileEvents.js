import React, { useEffect, useState } from "react";
import "./ProfileEvents.css";
import axios from "axios";
import { useAuth } from "../../../../Utils/AuthProvider";

const ProfileEvents = () => {
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
        <h2 className="">Wydarzenia</h2>
        <ul>
          <div className="events-row">
            {" "}
            <li className="events-item-icon style-list-elem text-color">
              AKTYWNOŚĆ
            </li>
            <li className="events-item-data style-list-elem text-color">
              START
            </li>
            <li className="events-item-data style-list-elem text-color">END</li>
            <li className="events-item-name style-list-elem text-color">
              WYDARZENIE
            </li>
            <li className="events-item style-list-elem text-color">OSOBY</li>
            <li className="events-item style-list-elem text-color">id</li>
          </div>
          {console.log(eventsData)}
          {eventsData
            ? eventsData.map((element, index) => (
                <li key={index} className="events-row bottom-border">
                  <div className="events-item-icon style-list-elem">
                    test_icon
                  </div>
                  <div className="events-item-data style-list-elem">
                    {element.event_time_start}
                  </div>
                  <div className="events-item-data style-list-elem">
                    {element.event_time_end}
                  </div>
                  <div className="events-item-name style-list-elem">
                    {element.event_name}
                  </div>
                  <div className="events-item style-list-elem">
                    {element.event_person_count}
                  </div>
                  <div className="events-item style-list-elem">{index}</div>
                </li>
              ))
            : null}
        </ul>
      </div>
    </div>
  );
};

export default ProfileEvents;

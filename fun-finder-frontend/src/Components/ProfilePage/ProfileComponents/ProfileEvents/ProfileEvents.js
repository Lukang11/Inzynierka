import React from "react";
import "./ProfileEvents.css";

const ProfileEvents = () => {
  const test_data = [
    {
      id: "1",
      date: "2023-10-12",
      nazwa_wydarzenia: "Przykładowe Wydarzenie",
      liczba: 32,
    },
    {
      id: "2",
      date: "2023-09-13",
      nazwa_wydarzenia: "Przykładowe Wydarzenie",
      liczba: 12,
    },
    {
      id: "3",
      date: "2023-11-13",
      nazwa_wydarzenia: "Przykładowe Wydarzenie",
      liczba: 22,
    },
    {
      id: "4",
      date: "2023-12-13",
      nazwa_wydarzenia: "Przykładowe Wydarzenie",
      liczba: 2,
    },
    {
      id: "5",
      date: "2023-07-13",
      nazwa_wydarzenia: "Przykładowe Wydarzenie",
      liczba: 97,
    },
  ];

  return (
    <div>
      <div className="events-card">
        <h2 className="">Wydarzenia</h2>
        <ul>
          <div className="events-row">
            {" "}
            <li className="events-item-icon style-list-elem text-color">
              AKTYWNOŚĆ
            </li>
            <li className="events-item-data style-list-elem text-color">
              DATA
            </li>
            <li className="events-item-name style-list-elem text-color">
              WYDARZENIE
            </li>
            <li className="events-item style-list-elem text-color">OSOBY</li>
            <li className="events-item style-list-elem text-color">id</li>
          </div>
          {test_data.map((element, index) => (
            <li key={element.id} className="events-row bottom-border">
              <div className="events-item-icon style-list-elem">test_icon</div>
              <div className="events-item-data style-list-elem">
                {element.date}
              </div>
              <div className="events-item-name style-list-elem">
                {element.nazwa_wydarzenia}
              </div>
              <div className="events-item style-list-elem">
                {element.liczba}
              </div>
              <div className="events-item style-list-elem">{element.id}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProfileEvents;

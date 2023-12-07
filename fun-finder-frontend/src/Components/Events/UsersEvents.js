import React from "react";
import "./UsersEvents.css";
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const UsersEvents = () => {
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
  ]
  const navigate = useNavigate();
  const handleRowClick = (id) => {
    navigate(`/event-info/${id}`);
  };

  return (

    <div className="users-events-container">
    <div className="users-events-card">
      <h2 className="">Wydarzenia</h2>
      <div className="events-button-container">
      <button className="event-add-button" onClick={() => navigate('/create-event') }>Dodaj wydarzenie</button>
      <button className="filter-events-button">Filtruj</button>
      </div>
      <ul>
        <div className="users-events-row">
          <li className="users-events-item-icon style-list-elem text-color">
            AKTYWNOŚĆ
          </li>
          <li className="users-events-item-data style-list-elem text-color">
            DATA
          </li>
          <li className="users-events-item-name style-list-elem text-color">
            WYDARZENIE
          </li>
          <li className="users-events-item style-list-elem text-color">OSOBY</li>
          <li className="users-events-item style-list-elem text-color">id</li>
        </div>
        {test_data.map((element, index) => (
          <li key={element.id} className="users-events-row bottom-border" onClick={() => handleRowClick(element.id)}>
            <div className="users-events-item-icon style-list-elem">test_icon</div>
            <div className="users-events-item-data style-list-elem">
              {element.date}
            </div>
            <div className="users-events-item-name style-list-elem">
              {element.nazwa_wydarzenia}
            </div>
            <div className="users-events-item style-list-elem">
              {element.liczba}
            </div>
            <div className="users-events-item style-list-elem">{element.id}</div>
          </li>
        ))}
      </ul>
    </div>
  </div>
  );
};

export default UsersEvents;
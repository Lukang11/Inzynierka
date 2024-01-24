import React, { useEffect, useState } from "react";
import axios from "axios";
import EventBattler from "../EventBattler/EventBattler";
import "./EventBattlerView.css";
import EventBattlerItem from "./EventBattlerItem/EventBattlerItem";
import EventBattlerCreateRoom from "./EventBattlerCreateRoomModal/CreateRoomModal";

function EventBattlerView() {
  const [showModal, setShowModal] = useState(false);
  const array = [
    {
      id: 1,
      is_active: true,
      description: "Szukam 4 osob na wieczór",
      participants: 1,
      location: "Sopot",
      date: "Today",
    },
    {
      id: 2,
      is_active: true,
      description: "Chińskie jedzenie",
      participants: 1,
      location: "Gdynia",
      date: "2023-12-12T15:30:00",
    },
    {
      id: 3,
      is_active: false,
      description: "Fokarium",
      location: "Hel",
      participants: 1,
      date: "2023-12-17T15:30:00",
    },
    {
      id: 4,
      is_active: true,
      description: "Spacer",
      location: "Gdańsk",
      participants: 2,
      date: "2023-12-17T15:30:00",
    },
    {
      id: 5,
      is_active: false,
      description: "Zatoka sztuki",
      location: "Sopot",
      participants: 3,
      date: "2023-12-17T15:30:00",
    },
    {
      id: 6,
      is_active: true,
      description: "Zbieranie worków piasku",
      location: "Wejherowo",
      participants: 4,
      date: "2023-12-17T15:30:00",
    },
  ];

  const  handleRefreshClick = async () => {
    // Tutaj dodać ponowne zaciąganie z bazy
    console.log("Odświeżam...");
  };
  const handleCreateGroupClick = () => {
    setShowModal(true);
    console.log(showModal);

  };
  const handleCloseModal = () => {
    setShowModal(false);
  }

  return (
    <div className="event-battler-container">
      <div className="event-battler-rooms">
        <div className="event-battler-tools">
          <button className="create-group-button" onClick={handleCreateGroupClick}>Stwórz pokój</button>
          <button className="refresh-button" onClick={handleRefreshClick}>Odśwież</button>
        </div>
        <div className="event-battler-H2">
          <h2>Dołącz do pokoju !</h2>
        </div>
        {array.map((val, index) => (
          <EventBattlerItem
            id={val.id}
            key={index}
            description={val.description}
            participants={val.participants}
            location={val.location}
            date={val.date}
          ></EventBattlerItem>
        ))}
      </div>
      {showModal && (
        <EventBattlerCreateRoom updateModalShow={handleCloseModal}/>
      )}
    </div>
  );
}


export default EventBattlerView;

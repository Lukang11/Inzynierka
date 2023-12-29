import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import EventBattler from "../EventBattler/EventBattler";
import "./EventBattlerView.css";
import EventBattlerItem from "./EventBattlerItem/EventBattlerItem";

function EventBattlerView() {
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
  const id = 1;
  return (
    <div className="event-battler-cont">
      {array.map((val, index) => (
        <EventBattlerItem
          id={val}
          key={index}
          isActive={val.is_active}
          description={val.description}
          participants={val.participants}
          location={val.location}
          date={val.date}
        ></EventBattlerItem>
      ))}
    </div>
  );
}

export default EventBattlerView;

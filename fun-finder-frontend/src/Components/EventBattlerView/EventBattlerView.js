import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import EventBattler from "../EventBattler/EventBattler";
import "./EventBattlerView.css";
import EventBattlerItem from "./EventBattlerItem/EventBattlerItem";

function EventBattlerView() {
  const array = [1, 2, 3, 4, 5, 6];
  const id = 1;
  return (
    <div className="event-battler-cont">
      {array.map((val, index) => (
        <EventBattlerItem id={val} key={index}></EventBattlerItem>
      ))}
    </div>
  );
}

export default EventBattlerView;

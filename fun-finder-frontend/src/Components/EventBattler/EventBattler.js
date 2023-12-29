import React from "react";
import "./EventBattler.css";
import EventBattlerChat from "./EventBattlerChat/EventBattlerChat";
import EventBattlerWindow from "./EventBattlerWindow/EventBattlerWindow";
import EventBattlerParticipants from "./EventBattlerParticipants/EventBattlerParticipants";

function EventBattler() {
  return (
    <div className="battler-container">
      <EventBattlerChat></EventBattlerChat>
      <EventBattlerWindow></EventBattlerWindow>
      <EventBattlerParticipants></EventBattlerParticipants>
    </div>
  );
}

export default EventBattler;

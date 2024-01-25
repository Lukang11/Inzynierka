import React from "react";
import "./EventBattlerItem.css";
import { useNavigate } from "react-router-dom";
import ActiveCircle from "../../ActiveCircle/ActiveCircle";

function EventBattlerItem({
  id,
  description,
  participants,
  date,
  location,
}) {
  const navigate = useNavigate();
  const handleRowClick = (id) => {
    console.log(id);
    navigate(`/battle/${id}`);
  };
  return (
    <div className="event-battler-item-cont" onClick={() => handleRowClick(id)}>
      <div className="event-battle-item-2">{description}</div>
      <div className="event-battle-item-3">{participants}</div>
      <div className="event-battle-item-4">{location}</div>
      <div className="event-battle-item-5">{date}</div>
    </div>
  );
}

export default EventBattlerItem;

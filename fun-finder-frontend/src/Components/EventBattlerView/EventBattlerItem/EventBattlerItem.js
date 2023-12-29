import React from "react";
import "./EventBattlerItem.css";
import { useNavigate } from "react-router-dom";

function EventBattlerItem({ id }) {
  const navigate = useNavigate();
  const handleRowClick = (id) => {
    navigate(`/battle/${id}`);
  };
  return (
    <div className="event-battler-item-cont" onClick={() => handleRowClick(id)}>
      EventBattlerrItem{" "}
    </div>
  );
}

export default EventBattlerItem;

import React from "react";
import "./EventBattlerOneUserView.css";

function EventBattlerOneUserView() {
  return (
    <div className="event-battler-one-cont">
      <>
        <div className="event-battler-one-wrapper">
          <div className="event-battler-one-item">
            {" "}
            Poczekaj aż ktoś dołączy do twojego pokoju,
          </div>{" "}
          <div className="event-battler-one-item">
            {" "}
            dopiero wtedy możemy dobrać wam aktywność
          </div>
          <div className="event-battler-waiting-dots event-battler-one-item">
            ...
          </div>
        </div>
      </>
    </div>
  );
}

export default EventBattlerOneUserView;

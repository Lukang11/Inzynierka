import React, { useState } from "react";
import "./CreateRoomModal.css";

function EventBattlerCreateRoom({updateModalShow}) {
  
    const [roomName, setRoomtName] = useState("");
    const [roomLocation, setRoomLocation] = useState("");
    const [roomDate, setRoomDate] = useState("");

    const handleRoomNameChange = (e) => {
        setRoomtName(e.target.value);
      };
    
      const handleRoomLocationChange = (e) => {
        setRoomLocation(e.target.value);
      };
    
      const handleRoomDateChange = (e) => {
        setRoomDate(e.target.value);
      };
    
      const handleSubmit = () => {
        // tutaj przekazac do rodzica dodanie do bazy pokoju

        updateModalShow();
      };
    
    return (
      <div className="event-battler-modal-overlay">
        <div className="event-battler-modal-content">
          <div className="event-battler-modal-close-button" onClick={updateModalShow}>
            &times;
          </div>
          <h2>Stwórz pokój</h2>
          <form>
            <label>
              Nazwa wydarzenia:
              <input type="text" value={roomName} onChange={handleRoomNameChange} />
            </label>
            <label>
              Miejsce:
              <input type="text" value={roomLocation} onChange={handleRoomLocationChange} />
            </label>
            <label>
              Data:
              <input type="date" value={roomDate} onChange={handleRoomDateChange} />
            </label>
            <button type="button" onClick={handleSubmit}>Utwórz</button>
            <button type="button">Anuluj</button>
          </form>
        </div>
      </div>
      );
    }
    
    
export default EventBattlerCreateRoom;
    

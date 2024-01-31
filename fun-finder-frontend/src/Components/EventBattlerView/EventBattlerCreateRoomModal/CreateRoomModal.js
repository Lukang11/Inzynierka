import React, { useState } from "react";
import "./CreateRoomModal.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function EventBattlerCreateRoom({updateModalShow}) {
    const navigate = useNavigate();
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
    
       const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post(`http://localhost:7000/battle/createRoom`, {
          description: roomName,
          participants: 0,
          location: roomLocation,
          date: roomDate
        }).then(response => {
          navigate(`/battle/${response.data}`);
        })
      };
    
    return (
      <div className="event-battler-modal-overlay">
        <div className="event-battler-modal-content">
          <div className="event-battler-modal-close-button" onClick={updateModalShow}>
            &times;
          </div>
          <h2>Stwórz pokój</h2>
          <form onSubmit={handleSubmit}> 
            <label>
              Nazwa wydarzenia:
              <input type="text" value={roomName} onChange={handleRoomNameChange}  required/>
            </label>
            <label>
              Miejsce:
              <input type="text" value={roomLocation} onChange={handleRoomLocationChange}  required/>
            </label>
            <label>
              Data:
              <input type="datetime-local" value={roomDate} onChange={handleRoomDateChange} required/>
            </label>
            <button type="submit">Utwórz</button>
            <button type="button">Anuluj</button>
          </form>
        </div>
      </div>
      );
    }
    
    
export default EventBattlerCreateRoom;
    

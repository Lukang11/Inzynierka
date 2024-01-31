import React, { useEffect, useState } from "react";
import axios from "axios";
import "./EventBattlerView.css";
import EventBattlerItem from "./EventBattlerItem/EventBattlerItem";
import EventBattlerCreateRoom from "./EventBattlerCreateRoomModal/CreateRoomModal";

function EventBattlerView() {
  const [showModal, setShowModal] = useState(false);
  const [roomsData, setRoomsData] = useState([{}])
  const [isButtonDisabled, setButtonDisabled] = useState(false);

  const  handleRefreshClick = async () => {
    setButtonDisabled(true);
    try {
      axios.get('http://localhost:7000/battle/getRooms').then(response => {
        setRoomsData(response.data);
    });
      setTimeout(() => {
        setButtonDisabled(false);
      },3000)
    }
    catch (err) {
      console.log("failed to load");
      setButtonDisabled(false);
    }

}
  const handleCreateGroupClick = () => {
    setShowModal(true);

  };
  const handleCloseModal = () => {
    setShowModal(false);
  }
  const formatDate = (date) => {
    const dataToFormat = new Date(date)
      const formattedDate = dataToFormat.toLocaleDateString('pl-PL', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
      return formattedDate;
  }

  useEffect(() => {
    axios.get('http://localhost:7000/battle/getRooms').then(response => {
      setRoomsData(response.data);
    })
  },[])

  return (
    <div className="event-battler-container">
      <div className="event-battler-rooms">
        <div className="event-battler-tools">
          <button className="create-group-button" onClick={handleCreateGroupClick}>Stwórz pokój</button>
          <button className="refresh-button" onClick={handleRefreshClick} disabled={isButtonDisabled}>Odśwież</button>
        </div>
        <div className="event-battler-H2">
          <h2>Dołącz do pokoju !</h2>
        </div>
        {roomsData.map((val, index) => (
          <EventBattlerItem
            id={val._id}
            key={index}
            description={val.description}
            participants={val.participants}
            location={val.location}
            date={formatDate(val.date)}
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

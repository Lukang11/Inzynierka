import React, { useEffect, useState, useRef } from "react";
import "./EventBattler.css";
import EventBattlerChat from "./EventBattlerChat/EventBattlerChat";
import EventBattlerWindow from "./EventBattlerWindow/EventBattlerWindow";
import EventBattlerParticipants from "./EventBattlerParticipants/EventBattlerParticipants";
import io from "socket.io-client";
import { useAuth } from "../../Utils/AuthProvider";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function EventBattler() {
  const { user } = useAuth(); // do pobierania id uz
  const { id } = useParams();
  const navigate = useNavigate();

  const [socket, setSocket] = useState(null);
  const [participants, setParticipants] = useState([]); // ludzie w roomie
  const [messages, setMessages] = useState([]); // wiadomosci w roomie
  const [doRoomExists, setDoRoomExists] = useState(null);

  const updateParticipants = (obj) => {
    // funkcja aktualizacja po dołączeniu do rooma
    setParticipants(obj);
  };
  const send = async (data) => {
    await socket?.emit("message", data);
  };

  const messageListener = (obj) => {
    setMessages(prevMessages => [...prevMessages, obj]);
  };

  useEffect(() => {

    const checkIfRoomExists = async () => {
      
      try {
        const response = await axios.get(`http://localhost:7000/battle/findRoom/${id}`);
        if (response.data === true) {
          setDoRoomExists(true)
        }
        else {
          setDoRoomExists(false);
        }
      }
      catch (err) {
        console.log("failed to find if roomExists");
        setDoRoomExists(false);
      }
    }

    if(user) {
      checkIfRoomExists();
    }
  }, [user]);

  useEffect(() => {
    if(doRoomExists !== null){
      if(doRoomExists === true){
        const newSocket = io("http://localhost:8002", {
        query: {
          sender_id: user._id,
          room_id: id, // uzupełnić
        },
       });
        setSocket(newSocket);
  
        return () => {
          newSocket.disconnect();
          
        };
      }
      else if (doRoomExists === false) {
        navigate('/battle');
      }

    }
  },[doRoomExists])



  useEffect(() => {
    socket?.on("message", messageListener); // odbieramy wiadomość
    socket?.on("handleDisconect", updateParticipants);
    socket?.on("updateParticipants", updateParticipants);
  }, [socket]);


  return (
    <div className="battler-container">
        <div className="battler-flex-window-item">
          {" "}
          <EventBattlerWindow
            participants={participants}
            className="battler-window-container"
          ></EventBattlerWindow>
        </div>
        <div className="battler-flex-chat-item">
          {" "}
          <EventBattlerChat
            passParticipants={participants}
            passMessages={messages}
            updateMessage={send}
            className="battler-chat-container"
          ></EventBattlerChat>
        </div>
      <EventBattlerParticipants
        participants={participants}
        className="battler-participants-container"
      />
    </div>
  );
}

export default EventBattler;

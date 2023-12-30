import React, { useEffect, useState, useRef } from "react";
import "./EventBattler.css";
import EventBattlerChat from "./EventBattlerChat/EventBattlerChat";
import EventBattlerWindow from "./EventBattlerWindow/EventBattlerWindow";
import EventBattlerParticipants from "./EventBattlerParticipants/EventBattlerParticipants";
import io from "socket.io-client";
import { useAuth } from "../../Utils/AuthProvider";
import { useParams } from "react-router-dom";

function EventBattler() {
  const { user } = useAuth(); // do pobierania id uz
  const { id } = useParams();

  const [socket, setSocket] = useState(null);
  const [participants, setParticipants] = useState([]); // ludzie w roomie
  const [messages, setMessages] = useState([]); // wiadomosci w roomie
  const [messageToSend, setMessageToSend] = useState(""); // wiadomość do wysłania do grupy

  const updateParticipants = (obj) => {
    // funkcja aktualizacja po dołączeniu do rooma
    console.log("podaje to", obj);
    setParticipants([[...participants, obj]]);
  };

  const messageListener = (obj) => {
    // funkcja zapisująca nową wiadomość
    // id: this.generateUniqueId(),
    // sender_id: userId, dostajemy coś takiego
    // text: message,
    setMessages([...messages, obj]); // funkcja do zapisania wiadomosci
  };

  useEffect(() => {
    // nawiązujemy połączenie
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
  }, [setSocket, user._id]);

  useEffect(() => {
    // odbieramy aktualizacje po dołączeniu kogos do rooma
    socket?.on("updateParticipants", updateParticipants);
    console.log("wykonuje");
  }, [updateParticipants]);

  useEffect(() => {
    // odbieranie wiadomości
    socket?.on("message", messageListener); // odbieranie wiadomości                                         // odbieramy wiadomość
  }, [messageListener]);

  return (
    <div className="battler-container">
      <EventBattlerChat></EventBattlerChat>
      <EventBattlerWindow></EventBattlerWindow>
      <EventBattlerParticipants></EventBattlerParticipants>
    </div>
  );
}

export default EventBattler;

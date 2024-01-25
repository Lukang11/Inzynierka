import React, { useEffect, useState, useRef } from "react";
import "./EventBattler.css";
import EventBattlerChat from "./EventBattlerChat/EventBattlerChat";
import EventBattlerWindow from "./EventBattlerWindow/EventBattlerWindow";
import EventBattlerParticipants from "./EventBattlerParticipants/EventBattlerParticipants";
import io from "socket.io-client";
import { useAuth } from "../../Utils/AuthProvider";
import { useParams } from "react-router-dom";
import axios from "axios";

function EventBattler() {
  const { user } = useAuth(); // do pobierania id uz
  const { id } = useParams();

  const [socket, setSocket] = useState(null);
  const [participants, setParticipants] = useState([]); // ludzie w roomie
  const [messages, setMessages] = useState([]); // wiadomosci w roomie

  const updateParticipants = (obj) => {
    // funkcja aktualizacja po dołączeniu do rooma
    setParticipants(obj);
  };
  const send = async (data) => {
    await socket?.emit("message", data);
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
  }, [updateParticipants]);

  useEffect(() => {
    // odbieranie wiadomości
    socket?.on("message", messageListener); // odbieramy wiadomość
  }, [messageListener]);

  useEffect(() => {
    // odbieranie wiadomości
    socket?.on("handleDisconect", updateParticipants); // odbieranie wiadomości                                         // odbieramy wiadomość
  }, [updateParticipants]);

  return (
    <div className="battler-container">
      <EventBattlerWindow participants={participants}></EventBattlerWindow>
      <EventBattlerChat
        passParticipants={participants}
        passMessages={messages}
        updateMessage={send}
      ></EventBattlerChat>
      <EventBattlerParticipants participants={participants} />
    </div>
  );
}

export default EventBattler;

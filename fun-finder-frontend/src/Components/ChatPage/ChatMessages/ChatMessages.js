import React, { useEffect, useState} from "react";
import "./ChatMessages.css"
import io from "socket.io-client"
import { useAuth } from "../../../Utils/AuthProvider";

function ChatMessages( {passWichMessageToDisplay, participantsInfo, passConversationId} ){
    const { user } = useAuth(); // do pobierania id uz

    const [socket, setSocket ] = useState(null);
    const [messages, setMessages] = useState([]);
    const [singleMessage, setSingleMessage] = useState("");
    const [participants, SetParticipants] = useState("");
    const [conversationId, setConversationId] = useState("");


    const messageListener = (obj) => {
        console.log("co ja ci tu podaje ", obj);
        setMessages([...messages, obj]) // funkcja do zapisania wiadomosci
        console.log(messages, " co to za obiekt");
         /// tu mi coś nie działa 
    }
    
     const send = async (data) => {
        console.log(data);
        await socket?.emit("message",(data));
    }

    const handleData = (singleMessage,user_id,passConversationId,participantsInfo) => {
        const dataToSendViaSocket = {
            message:singleMessage,
            user_id:user_id,
            conversationId: passConversationId,
            participants: participantsInfo
        }
        send(dataToSendViaSocket);
    }
    const handleKeyPress = (Event) => {
        if (Event.key === 'Enter') {
            send(singleMessage,user._id);
        }
    }
    useEffect(() => {
        setMessages(passWichMessageToDisplay);
        setConversationId(passConversationId);
        SetParticipants(participantsInfo);
    },[passWichMessageToDisplay,passConversationId,participantsInfo])

    useEffect(() => {
        const newSocket = io("http://localhost:8001", {
            query: {
                "sender_id": user._id,
            },
        })
        setSocket(newSocket);
                                                        // nawiązujemy połączenie
        return () => {
            newSocket.disconnect();
        }
        
    },[setSocket,user._id])

    useEffect(() => {
        socket?.on("message",messageListener)

        return () => {
            socket?.off("message",messageListener)
        }                                               // odbieramy wiadomość
    },[messageListener])

    const handleInputChange = (e) => {
        e.preventDefault();
        setSingleMessage(e.target.value); // Aktualizacja stanu zgodnie z wartością z pola wejściowego
      };

    return (
        <div className="chat-wrapper">
            <div className="chat-field">
                {messages.map((message)=>{
                    console.log(message)
                return (<div  key={message._id}
                    className={ user._id === message.sender_id ? "chat-item-owner" : "chat-item-other"}>
                    <p>{message.text}</p>
                </div>)

                })}
            </div>
            <div className="message-field">
                    <input
                        className="message-input"
                        type="text"
                        value={singleMessage}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyPress}/>
                    <button
                        className="message-send-btn"  
                        onClick={ () => handleData(singleMessage,user._id,passConversationId,participantsInfo)}>
                    </button>
            </div>
        </div>
        
        
    );
}

export default ChatMessages;


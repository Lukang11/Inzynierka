import React, { useEffect, useState, useRef} from "react";
import "./ChatMessages.css"
import io from "socket.io-client"
import { useAuth } from "../../../Utils/AuthProvider";

function ChatMessages( {passWichMessageToDisplay, participantsInfo, passConversationId,passChatType} ){
    const { user } = useAuth(); // do pobierania id uz

    const [socket, setSocket ] = useState(null);
    const [messages, setMessages] = useState([]);
    const [participants, SetParticipants] = useState("");
    const [conversationId, setConversationId] = useState("");
    const inputMesageRef = useRef(null);

    const getParticipantImage = (id) => {
        const foundParticipant = participants.find(participant => participant.id === id);
        if (foundParticipant) {
            return foundParticipant.avatar
        }
        else {
            return user.avatar
        }
        
    }

    const getParticipantsName = (id) => {
        const foundParticipant = participants.find(participant => participant.id === id);
        if(foundParticipant) {
            return foundParticipant.fname + " " + foundParticipant.lname
        }
        else {
            return user.fname + " " + user.lname
        }
    }
    

    const messageListener = (obj) => {
        console.log("co ja ci tu podaje ", obj);
        setMessages([...messages, obj]) // funkcja do zapisania wiadomosci
        console.log(messages, " co to za obiekt");
         /// tu mi coś nie działa 
    }
    
     const send = async (data) => {
        console.log(data + "to są dane do wysłania");
        await socket?.emit("message",(data));
    }
    const handleMessageInput = () => {
        const value = inputMesageRef.current.value;
        console.log(value);
    }

    const handleData = (singleMessage,user_id,passConversationId,participantsInfo,passChatType) => {
        if(singleMessage !== "") {
            const dataToSendViaSocket = {
                message:singleMessage,
                user_id:user_id,
                conversationId: passConversationId,
                participants: participantsInfo,
                chatType: passChatType
            }
            console.log("to wysylam ", dataToSendViaSocket);
            send(dataToSendViaSocket);
        }
    }
    const handleKeyPress = (Event) => {
        if (Event.key === 'Enter') {
            handleData(inputMesageRef.current.value,user._id,passConversationId,participantsInfo,passChatType);
        }
    }
    useEffect(() => {
        console.log(participants)
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


    return (
        <div className="chat-wrapper">
            <div className="chat-field">
                {messages.map((message)=>{
                return (
                <div  key={message._id} 
                className={ user._id === message.sender_id ? "chat-item-owner" : "chat-item-other"}>
                    <img
                    className="event-battler-chat-avatar"
                    src={getParticipantImage(message.sender_id)}
                    alt="Avatar"
                    />
                    <div className="event-battler-chat-details-wrapper">
                        <p className="event-battler-chat-user-info">
                            {getParticipantsName(message.sender_id)}
                        </p>
                        <p className="event-battler-chat-message">
                        {message.text}
                        </p>
                </div>
                </div>)

                })}
            </div>
            <div className="message-field">
                    <input
                        className="message-input"
                        type="text"
                        ref={inputMesageRef}
                        onChange={handleMessageInput}
                        onKeyDown={handleKeyPress}/>
                    <button
                        className="message-send-btn"
                        onClick={ () => handleData(inputMesageRef.current.value,user._id,passConversationId,participantsInfo,passChatType)}>
                    </button>
            </div>
        </div>
        
        
    );
}

export default ChatMessages;


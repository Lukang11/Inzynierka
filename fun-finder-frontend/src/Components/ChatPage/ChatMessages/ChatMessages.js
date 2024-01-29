import React, { useEffect, useState, useRef} from "react";
import "./ChatMessages.css"
import io from "socket.io-client"
import { useAuth } from "../../../Utils/AuthProvider";
import axios from "axios";

function ChatMessages( {passWichMessageToDisplay, chatParticipants, passConversationId,passChatType} ){
    const { user } = useAuth(); // do pobierania id uz

    const [socket, setSocket ] = useState(null);
    const [messages, setMessages] = useState([]);
    const [participants, SetParticipants] = useState("");
    const [participantsInfo, setParticipantsInfo] = useState([{}]);
    const [conversationId, setConversationId] = useState("");
    const inputMesageRef = useRef(null);
    const lastItemRef = useRef(null);


    const getParticipantImage = (id) => {
        const foundParticipant = participantsInfo.find(participant => participant.id === id);
        if (foundParticipant) {
            return foundParticipant.avatar
        }
        else {
            return user.avatar
        }
        
    }

    const getParticipantsName = (id) => {
        const foundParticipant = participantsInfo.find(participant => participant.id === id);
        if(foundParticipant) {
            return foundParticipant.fname + " " + foundParticipant.lname
        }
        else {
            return user.fname + " " + user.lname
        }
    }
    
    const getParticipantsInfo = async (participantsIds) => {
        console.log(participantsIds);
        const response = await axios.post(`http://localhost:7000/clouds/chatParticipants/info`,{participantsIds: participantsIds});
        setParticipantsInfo(response.data);
        
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

    const handleData = (singleMessage,user_id,participantsInfo,passChatType) => {
        if(singleMessage !== "") {
            const dataToSendViaSocket = {
                message:singleMessage,
                user_id:user_id,
                conversationId: conversationId,
                participants: participantsInfo,
                chatType: passChatType
            }
            console.log("to wysylam ", dataToSendViaSocket);
            send(dataToSendViaSocket);
        }
    }
    const handleKeyPress = (Event) => {
        if (Event.key === 'Enter') {
            handleData(inputMesageRef.current.value,user._id,chatParticipants,passChatType);
        }
    }
    useEffect(() => {
        setMessages(passWichMessageToDisplay);
        setConversationId(passConversationId);
        SetParticipants(chatParticipants);
    },[passWichMessageToDisplay,passConversationId,chatParticipants])

    useEffect(() => {
        if(participants) {
            getParticipantsInfo(participants)
            console.log(participantsInfo)
        }
    },[participants]);

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

    useEffect(() => {
        if (lastItemRef.current) {
          lastItemRef.current.scrollIntoView({ behavior: 'smooth' });
        }
      }, [messages]);


    return (
        <div className="chat-wrapper">
            <div className="chat-field">
                {messages.map((message,index)=>{
                return (
                <div  key={index} 
                ref={index === messages.length - 1 ? lastItemRef : null}
                className={ user._id === message.sender_id ? "chat-item-owner" : "chat-item-other"}
                >
                {user._id !== message.sender_id ? (
                    <>
                    <div className="event-battler-chat-details-wrapper">
                        <p className="event-battler-chat-user-info-other">
                            {getParticipantsName(message.sender_id)}
                        </p>
                        <p className="event-battler-chat-message">{message.text}</p>
                    </div>
                    <img
                    className="event-battler-chat-avatar"
                    src={getParticipantImage(message.sender_id)}
                    alt="Avatar"/></>
                ) : (
                    <>
                    <img
                    className="event-battler-chat-avatar"
                    src={getParticipantImage(message.sender_id)}
                    alt="Avatar"
                    />
                    <div className="event-battler-chat-details-wrapper">
                        <p className="event-battler-chat-user-info-owner">
                            {getParticipantsName(message.sender_id)}
                        </p>
                        <p className="event-battler-chat-message">{message.text}</p>
                    </div>
                    </>
                )}
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
                        onClick={ () => handleData(inputMesageRef.current.value,user._id,chatParticipants,passChatType)}>
                            <a>+</a>
                    </button>
            </div>
        </div>
        
        
    );
}

export default ChatMessages;


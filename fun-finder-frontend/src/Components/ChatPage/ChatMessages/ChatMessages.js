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
    const [inputValue,setInputValue] = useState("");
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
        const response = await axios.post(`http://localhost:7000/clouds/chatParticipants/info`,{participantsIds: participantsIds});
        setParticipantsInfo(response.data);
        
    }

    const messageListener = (obj) => {
        setMessages([...messages, obj]) // funkcja do zapisania wiadomosci
         /// tu mi coś nie działa 
    }
    
     const send = async (data) => {
        await socket?.emit("message",(data));
    }
    const handleMessageInput = () => {
        const value = inputMesageRef.current.value;
        setInputValue(value)
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
            setInputValue("");
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
                    <div className="chat-details-wrapper">
                        <p className="chat-user-info-other">
                            {getParticipantsName(message.sender_id)}
                        </p>
                        <p className="chat-message">{message.text}</p>
                    </div>
                    <img
                    className="messages-chat-avatar"
                    src={getParticipantImage(message.sender_id)}
                    alt="Avatar"/></>
                ) : (
                    <>
                    <img
                    className="messages-chat-avatar"
                    src={getParticipantImage(message.sender_id)}
                    alt="Avatar"
                    />
                    <div className="chat-details-wrapper">
                        <p className="chat-user-info-owner">
                            {getParticipantsName(message.sender_id)}
                        </p>
                        <p className="chat-message">{message.text}</p>
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
                        value={inputValue}
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


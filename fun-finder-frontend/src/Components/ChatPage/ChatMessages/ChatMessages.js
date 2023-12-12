import React, { useEffect, useState} from "react";
import "./ChatMessages.css"
import io , {socket} from "socket.io-client"
import { useAuth } from "../../../Utils/AuthProvider";

function ChatMessages( {passWichMessageToDisplay} ){
    const { user } = useAuth(); // do pobierania id uz

    const [socket, setSocket ] = useState(null);
    const [messages, setMessages] = useState([]);
    const [singleMessage, setSingleMessage] = useState("");


    const messageListener = (obj) => {
        console.log("co ja ci tu podaje ", obj);
        setMessages([...messages, obj[0]]) // funkcja do zapisania wiadomosci
        console.log(messages, " co to za obiekt");
         /// tu mi coś nie działa 
    }
    
    const send = (message,id) => {
        socket?.emit("message",message,id);
    }

    const handleKeyPress = (Event) => {
        if (Event.key === 'Enter') {
            send(singleMessage);
        }
    }
    useEffect(() => {
        setMessages(passWichMessageToDisplay);
    },[passWichMessageToDisplay])

    useEffect(() => {
        const newSocket = io("http://localhost:8001")
        setSocket(newSocket);
                                                        // nawiązujemy połączenie
        return () => {
            newSocket.disconnect();
        }
        
    },[setSocket])

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
                    const userId = String(user._id);
                return (<div  key={message._id}
                    className={ userId === message.sender_id ? "chat-item-owner" : "chat-item-other"}>
                    <p>{message.text}</p>
                </div>)

                })}
            </div>
            <div className="message-field">
                    <input
                        className="message-input"
                        type="text"
                        value={singleMessage}
                        onChange={(e) => setSingleMessage(e.target.value)}
                        onKeyDown={handleKeyPress}/>
                    <button
                        className="message-send-btn"  
                        onClick={ () => send(singleMessage,user._id)}>
                    </button>
            </div>
        </div>
        
        
    );
}

export default ChatMessages;


import React, { useEffect, useState} from "react";
import "./ChatMessages.css"
import io , {socket} from "socket.io-client"

function ChatMessages( {passWichMessageToDisplay} ){
    const [socket, setSocket ] = useState(null);
    const [messages, setMessages] = useState([]);
    const [singleMessage, setSingleMessage] = useState("");

    const messageListener = (obj) => {
        setMessages([...messages, [obj[0]]]) // funkcja do zapisania wiadomosci
        console.log(obj,"co to"); /// tu mi coś nie działa 
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
                {messages.map((mesage,id)=>(
                <div key={id}
                    className='chat-item-owner'>
                    <p>{mesage}</p>
                </div>
                ))}
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
                        onClick={ () => send(singleMessage,'test')}>
                    </button>
            </div>
        </div>
        
        
    );
}

export default ChatMessages;


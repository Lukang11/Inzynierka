import React from "react";
import "./ChatClouds.css"
import { useState } from "react";


function ChatClouds({ passChatCloudsDBData, updateWichMessagesToDisplay }){
    const [lastMess,setLastMess] = useState("");

    const changeWichMessageToUpdate = (id) =>{
            console.log(lastMess, "a tu cos robie")
            console.log(id);
            setLastMess(id)
            updateWichMessagesToDisplay(id);
    }

    return (
    <div className="chat-clouds">
            <hr></hr>
            {passChatCloudsDBData.map((item) => (
            <button 
            key = {item.chatId}
            onClick={() => {changeWichMessageToUpdate(item.chatId); console.log("ile razy sie wykonuje")}}
            className="btn-chat-clouds">
                <div className="chat-item">
                    <div className="chat-avatar">
                    </div>
                    <div className="chat-info">
                        <p>{item.name}</p>
                        <div className="chat-info-message">
                            <p>{item.lastMessage}</p>
                        </div>
                    </div>
                    </div>
                <hr></hr>
            </button>
            
            ))}
    </div>
    );
}

export default ChatClouds;

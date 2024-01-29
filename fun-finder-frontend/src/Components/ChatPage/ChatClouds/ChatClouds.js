import React from "react";
import "./ChatClouds.css"
import { useState } from "react";


function ChatClouds({ passChatCloudsDBData, updateWichMessagesToDisplay }){

    const changeWichMessageToUpdate = (id) =>{
            updateWichMessagesToDisplay(id);
    }

    const replaceLongLastMessage = (message) => {
        if(message.length > 15) {
            const newLastMessage = message.substring(0,12) + "...";
            return newLastMessage
        }
        return message
    }
    return (
    <div className="chat-clouds">
            {passChatCloudsDBData.map((item) => (
            <button 
            key = {item.chatId}
            onClick={() => {changeWichMessageToUpdate(item.chatId)}}
            className="btn-chat-clouds">
                <div className="chat-item">
                    <div className="chat-avatar"
                    style={{backgroundImage: `url(${item.avatar})`}}>
                    </div>
                    <div className="chat-info">
                            <p>{item.name}</p>
                        <div className="chat-info-message">
                            <a>{replaceLongLastMessage(item.lastMessage)}</a>
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

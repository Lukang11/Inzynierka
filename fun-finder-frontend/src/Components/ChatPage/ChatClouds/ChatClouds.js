import React from "react";
import "./ChatClouds.css"


function ChatClouds({ passChatCloudsDBData, updateWichMessagesToDisplay }){

    const changeWichMessageToUpdate = (id) =>{
        console.log(id);
        updateWichMessagesToDisplay(id);
    }

    return (
    <div className="chat-clouds">
            <hr></hr>
            {passChatCloudsDBData.map((item) => (
            <button 
            key = {item.chatId}
            onClick={() => changeWichMessageToUpdate(item.chatId)}
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

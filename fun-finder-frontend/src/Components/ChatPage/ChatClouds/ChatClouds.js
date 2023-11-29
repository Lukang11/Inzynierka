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
            key = {item.id}
            onClick={() => changeWichMessageToUpdate(item.id)}
            className="btn-chat-clouds">
                <div className="chat-item">
                    <div className="chat-avatar">
                    </div>
                    <div className="chat-info">
                        <p>{item.name} {item.surename}</p>
                        <div className="chat-info-message">
                            <p>{item.newMessage}</p>
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

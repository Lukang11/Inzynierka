import React from "react";
import "./ChatMessages.css"

function ChatMessages( {passWichMessageToDisplay} ){

    return (
        <div className="chat-field">
            {passWichMessageToDisplay.map((item)=>(
                <div key={item.id}
                className={`chat-item-owner ${item.userId !==0 ? 'chat-item-other' : ''}`}>
                    <p>{item.message}</p>
                </div>
            ))}
        </div>
        
    );
}

export default ChatMessages;


import React from "react";
import "./ChatTypes.css";

function ChatTypes(){
    return (
        <div className="chat-types">
            <button className="persons-btn">
                <a>Osoby</a>
            </button>
            <button className="group-btn">
                <a>Grupy</a>
            </button>
            <button className="event-btn">
                <a>Wydarzenia</a>
            </button>
        </div>
    );
}

export default ChatTypes;
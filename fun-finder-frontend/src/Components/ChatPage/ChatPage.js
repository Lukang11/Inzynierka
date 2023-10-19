import React from "react";
import "./ChatPage.css";
import ChatTypes from "./ChatTypes/ChatTypes";
import ChatMessages from "./ChatMessages/ChatMessages";
import ChatClouds from "./ChatClouds/ChatClouds";

function ChatPage() {
    return (
        <div className="chat-page">
            <div className="chat-clouds-section">
                <ChatTypes/>
                <ChatClouds/>
            </div>
            <div className="chat-messages-section">
                <ChatMessages/>
            </div>
        </div>
    );
}

export default ChatPage;
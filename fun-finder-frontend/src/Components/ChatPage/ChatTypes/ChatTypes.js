import React, { useState } from "react";
import "./ChatTypes.css";

function ChatTypes({ updateWichChatToDisplay, clearDisplayedMessage }) {

    const [personChatBtnClicked, setPersonChatBtnClicked] = useState(true);
    const [groupChatBtnClicked, setGroupBtnClicked] = useState(false);
    const [eventChatBtnClicked, setEventChatBtnClicked] = useState(false);

    const changePersonChatBtnStatus = () => {

        updateWichChatToDisplay("person");
        setPersonChatBtnClicked(true);
        setGroupBtnClicked(false);
        setEventChatBtnClicked(false);
        clearDisplayedMessage("");
    }
    const changeGroupChatBtnStatus = () => {

        updateWichChatToDisplay("group");
        setPersonChatBtnClicked(false);
        setGroupBtnClicked(true);
        setEventChatBtnClicked(false);
        clearDisplayedMessage("");
    }

    const changeEventChatBtnStatus = () => {

        updateWichChatToDisplay("event");
        setPersonChatBtnClicked(false);
        setGroupBtnClicked(false);
        setEventChatBtnClicked(true);
        clearDisplayedMessage("");

    }

    return (
        <div className="chat-types">
            <button
                className={`buttonNotClicked ${personChatBtnClicked ? 'buttonClicked' : ''}`}
                onClick={() => changePersonChatBtnStatus()}
            >
                Osoby
            </button>
            <button
                className={`buttonNotClicked ${groupChatBtnClicked ? 'buttonClicked' : ''}`}
                onClick={() => changeGroupChatBtnStatus()}
            >
                Grupy
            </button>
            <button
                className={`buttonNotClicked ${eventChatBtnClicked ? 'buttonClicked' : ''}`}
                onClick={() => changeEventChatBtnStatus()}
            >
                Eventy
            </button>
        </div>
        
    );
}

export default ChatTypes;

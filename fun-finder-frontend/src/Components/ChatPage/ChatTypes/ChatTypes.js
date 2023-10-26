import React, { useState } from "react";
import "./ChatTypes.css";

function ChatTypes() {
    const [buttonStyles, setButtonStyles] = useState({
        person: "NotClicked",
        group: "NotClicked",
        event: "NotClicked",
    });

    const changeButtonStyle = (type) => {
        const newStyles = { ...buttonStyles };
        for (const key in newStyles) {
            newStyles[key] = key === type ? "Clicked" : "NotClicked";
        }
        setButtonStyles(newStyles);
    };

    return (
        <div className="chat-types">
            {["person", "group", "event"].map((type) => (
                <button
                    key={type}
                    className={`button${buttonStyles[type]}`}
                    onClick={() => changeButtonStyle(type)}
                    >
                    {type}
                </button>
            ))}
        </div>
    );
}

export default ChatTypes;

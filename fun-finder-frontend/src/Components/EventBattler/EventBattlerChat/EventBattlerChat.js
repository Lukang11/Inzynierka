import React, { useEffect, useState, useRef} from "react";
import { useAuth } from "../../../Utils/AuthProvider";
import "./EventBattlerChat.css"

function EventBattlerChat() {
  const { user } = useAuth(); // do pobierania id uz
  const [messages, setMessages] = useState([
    {
      _id: "test",
      text: "testMessage",
      sender_id: "testsender"
    },
    {
      _id: "test",
      text: "testMessage",
      sender_id: "testsender"
    },
    {
      _id: "test",
      text: "testMessageABSHJDBJAHSDVJHAVSDJASHJBDAHJDBaksbdhajksdbhjasdbajksdbaskdbajksbdjkasbdkjabsdjk",
      sender_id: "testsender"
    },
    {
      _id: "test",
      text: "testMessage",
      sender_id: "testsender"
    },
    {
      _id: "test",
      text: "testMessage",
      sender_id: "testsender"
    }
  ]);
  

  return <div className="event-battle-chat-wrapper">
            <div className="event-battle-chat-field">
                {messages.map((message)=>{
                    console.log(message)
                return (<div  key={message._id}
                    className={ user._id === message.sender_id ? "event-battle-chat-item-owner" : "event-battle-chat-item-other"}>
                    <p>{message.text}</p>
                </div>)

                })}
            </div>
            <div className="event-battle-message-field">
                    <input
                        className="event-battle-message-input"
                        type="text"
                        // ref={inputMesageRef}
                        // onChange={handleMessageInput}
                        // onKeyDown={handleKeyPress}
                        />
                    <button
                        className="event-battle-message-send-btn"
                        // onClick={ () => handleData(inputMesageRef.current.value,user._id,passConversationId,participantsInfo,passChatType)}
                        >
                    </button>
            </div>
        </div>
}

export default EventBattlerChat;

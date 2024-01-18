import React, { useEffect, useState, useRef } from "react";
import { useAuth } from "../../../Utils/AuthProvider";
import "./EventBattlerChat.css";
import ActiveCircle from "../../ActiveCircle/ActiveCircle";

function EventBattlerChat( {passParticipants,passMessages,updateMessage} ) {
  const { user } = useAuth(); // do pobierania id uz
  const [participantsIds,setParticipantsIds] = useState();
  const [usersData,setUsersData] = useState([]);
  const [myData,setMyData] = useState({});
  const inputMesageRef = useRef(null);
  
const getMessageSenderFname = (id) => {
  const userFname = usersData.find(user => user._id === id);
  return userFname ? userFname.fname : null;
}

const getMessageSenderAvatar = (id) => {
  const userAvatar = usersData.find(userAvatar => userAvatar._id === id);
  return userAvatar ? userAvatar.avatar : null;
}
const getMessageSenderEmail = (id) => {
  if(user && id === user._id){
    return true;
  }
  else return false;
}
const handleData = (singleMessage,user_id) => {
  if(singleMessage !== "") {
      const dataToSendViaSocket = {
          message:singleMessage,
          user_id:user_id,
      }
      updateMessage(dataToSendViaSocket);
      inputMesageRef.current.value = '';
  }
}
  const handleMessageInput = () => {
    const value = inputMesageRef.current.value;
    console.log(value);
}
const handleKeyPress = (Event) => {
  if (Event.key === 'Enter') {
      handleData(inputMesageRef.current.value,user._id);
  }
}

 
  useEffect(() => {
    setParticipantsIds(passParticipants);
  },[passParticipants])

  useEffect(() => {
    const fetchUserData = async () => {
      if(participantsIds !== undefined && participantsIds.length > 0){
      try {
        const userData = await Promise.all(
          participantsIds.map(async (participant) => {
            const response = await fetch(`http://localhost:7000/users/user-data-id/${participant}`);
            const data = await response.json();
            if(user && participant === user._id){
              setMyData({
                fname: data.fname,
                avatar: data.avatar
              })
            }
            return {
              _id: data._id,
              email: data.email,
              fname: data.fname,
              lname: data.lname,
              avatar: data.avatar,
            };
          })
        );
        setUsersData(userData);
      } catch (error) {
        console.error("Error fetching data:", error);
        setUsersData([]);
      }
    }
    };

    fetchUserData();
  }, [participantsIds]);

  return (
    <div className="event-battle-chat-wrapper">
      <div className="event-battle-chat-field">
        {passMessages.map((message) => {
          return (
            <div key={message._id} >
            <div
              className={
                getMessageSenderEmail(message.sender_id)
                  ? "event-battle-chat-item-owner"
                  : "event-battle-chat-item-other"
              }>
                    {getMessageSenderAvatar(message.sender_id) === null ? (
                    <ActiveCircle isActive={false} />
                ) : (
                <img
                className="event-battler-chat-avatar"
                src={getMessageSenderAvatar(message.sender_id)}
                alt="Avatar"
              />
              )}
              <div className="event-battler-chat-details-wrapper">
                <p className="event-battler-chat-user-info">
                  {getMessageSenderFname(message.sender_id)}
                </p>
                <p className="event-battler-chat-message">
                  {message.text}
                </p>
              </div>
            </div>
            </div>
          );
        })}
      </div>
      <div className="event-battle-message-field">
        <input
          className="event-battle-message-input"
          type="text"
          ref={inputMesageRef}
          onChange={handleMessageInput}
          onKeyDown={handleKeyPress}
        />
        <button
          className="event-battle-message-send-btn"
          onClick={ () => handleData(inputMesageRef.current.value,user._id)}
        ></button>
      </div>
    </div>
  );
}

export default EventBattlerChat;

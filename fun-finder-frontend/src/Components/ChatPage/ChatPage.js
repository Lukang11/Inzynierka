import "./ChatPage.css";
import ChatTypes from "./ChatTypes/ChatTypes";
import ChatClouds from "./ChatClouds/ChatClouds";
import ChatMessages from "./ChatMessages/ChatMessages";
import ChatNewMessageComponent from "./ChatNewMessage/ChatNewMessage";
import { useAuth } from "../../Utils/AuthProvider"
import { useState, useEffect } from "react";
import axios from 'axios';

const ChatPageComponent = () => {
    const { user } = useAuth(); // do pobierania id uz

    const [whichChatToDisplay,setWichChatToDisplay] = useState("person");
    const [whichMessagesToDisplay,setWichMessagesToDisplay] = useState("");
    const [participantInfo, setParticipantInfo] = useState([]);
    const [messages, SetMessages] = useState([]);
    const [newChat, setNewChat] = useState(false);
    const [initialRender, setInitialRender] = useState(true); // Dodatkowy stan

    useEffect(() => { //use effect do wyświetlania dymkow czatu
        if (initialRender) {
            setInitialRender(false);
            return;
        }
        switch (whichChatToDisplay) {
            case "person":
                if(user){
                    console.log(user)
                    axios.get(`http://localhost:7000/clouds/participants/${user._id}`)
                    .then(response => {
                    setParticipantInfo(response.data);
                    console.log(response.data);
                    console.log("dodaje? tak?")
                    })
                    .catch(error => {
                    console.error('Error fetching participant info:', error);
                    });

                break;
                }

            case "event":
                if(user) {
                    axios.get(`http://localhost:7000/clouds/event/${user._id}`)
                .then(response => {
                    setParticipantInfo(response.data);
                    console.log(response.data);
                })
                .catch(error => {
                    console.error('Error fetching group info', error);
                })

                break;
                }
        }
      }, [whichChatToDisplay,initialRender,newChat,user]);

    useEffect(() => { //use effect do wyswietlenia wiadomości z chatu
        if(whichMessagesToDisplay !== ""){
            const chatId = whichMessagesToDisplay;
            axios.get(`http://localhost:7000/messages/${chatId}`)
                .then(response => {
                SetMessages(response.data);
            console.log(response.data);
        })
        .catch(error => {
            console.log('Error fetching messages info', error);
        })
        }
    },[whichMessagesToDisplay])

    const updateWichChatToDisplay = (data) => {
        setWichChatToDisplay(data);
    };
    const updateWichMessagesToDisplay = (chatId) => {
        if(chatId !== whichMessagesToDisplay){
            setWichMessagesToDisplay(chatId);
            SetMessages([]);   
        }
    };

    const handleNewChatAdded = (chat) => {
        setTimeout(() => {
            setNewChat(!newChat);
          }, 1000);
    }


    return (
        <div className="chat-page">
            <div className="chat-clouds-section">
                <ChatTypes
                    updateWichChatToDisplay={updateWichChatToDisplay}
                    clearDisplayedMessage={updateWichMessagesToDisplay}/>
                <ChatClouds 
                    passChatCloudsDBData={participantInfo} 
                    updateWichMessagesToDisplay={updateWichMessagesToDisplay}/>
                {whichChatToDisplay === "person" && (
                    <ChatNewMessageComponent
                    handleNewChat={handleNewChatAdded}/>
                )}
            </div>
            <div className="chat-messages-section">
                {whichMessagesToDisplay !== "" && (
                    <ChatMessages 
                    passWichMessageToDisplay={messages}
                    participantsInfo={participantInfo}
                    passConversationId={whichMessagesToDisplay}
                    passChatType={whichChatToDisplay}
                    />
                )}
            </div>
            </div>
        );
    }
    


export default ChatPageComponent;
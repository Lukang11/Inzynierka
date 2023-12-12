import "./ChatPage.css";
import ChatTypes from "./ChatTypes/ChatTypes";
import ChatClouds from "./ChatClouds/ChatClouds";
import ChatMessages from "./ChatMessages/ChatMessages";
import { useAuth } from "../../Utils/AuthProvider"
import { useState, useEffect } from "react";
import axios from 'axios';

const ChatPageComponent = () => {
    const { user } = useAuth(); // do pobierania id uz

    const [whichChatToDisplay,setWichChatToDisplay] = useState("person");
    const [whichMessagesToDisplay,setWichMessagesToDisplay] = useState("");
    const [participantInfo, setParticipantInfo] = useState([]);
    const [messages, SetMessages] = useState([]);
    const [initialRender, setInitialRender] = useState(true); // Dodatkowy stan

    useEffect(() => { //use effect do wyświetlania dymkow czatu
        if (initialRender) {
            setInitialRender(false);
            return;
        }

        
        const userId = user._id; // id zalogowanego usera

        switch (whichChatToDisplay) {
            case "person":
                axios.get(`http://localhost:7000/clouds/participants/${userId}`)
                .then(response => {
                setParticipantInfo(response.data);
                console.log(response.data);
                })
                .catch(error => {
                console.error('Error fetching participant info:', error);
                });

                break;
        
            case "group":
                axios.get(`http://localhost:7000/clouds/group/${userId}`)
                .then(response => {
                    setParticipantInfo(response.data);
                    console.log(response.data);
                })
                .catch(error => {
                    console.error('Error fetching group info;', error);
                })

                break;

            case "event":
                axios.get(`http://localhost:7000/clouds/event/${userId}`)
                .then(response => {
                    setParticipantInfo(response.data);
                    console.log(response.data);
                })
                .catch(error => {
                    console.error('Error fetching group info', error);
                })

                break;
        }
      }, [whichChatToDisplay,initialRender]);

    useEffect(() => { //use effect do wyswietlenia wiadomości z chatu
        if(whichMessagesToDisplay != 0){
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
        setWichMessagesToDisplay(chatId);
        SetMessages([]);
    };

    return (
        <div className="chat-page">
            <div className="chat-clouds-section">
                <ChatTypes
                    updateWichChatToDisplay={updateWichChatToDisplay}
                    clearDisplayedMessage={updateWichMessagesToDisplay}/>
                <ChatClouds 
                    passChatCloudsDBData={participantInfo} 
                    updateWichMessagesToDisplay={updateWichMessagesToDisplay}/>
            </div>
            <div className="chat-messages-section">
                {whichMessagesToDisplay !== "" && (
                    <ChatMessages passWichMessageToDisplay={messages}/>
                )}
            </div>
            </div>
        );
    }
    


export default ChatPageComponent;
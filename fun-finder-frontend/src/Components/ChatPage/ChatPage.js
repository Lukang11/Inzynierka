import "./ChatPage.css";
import ChatTypes from "./ChatTypes/ChatTypes";
import ChatClouds from "./ChatClouds/ChatClouds";
import ChatMessages from "./ChatMessages/ChatMessages";
import ChatNewMessageComponent from "./ChatNewMessage/ChatNewMessage";
import { useAuth } from "../../Utils/AuthProvider"
import { useState, useEffect } from "react";
import axios from 'axios';
import { faL } from "@fortawesome/free-solid-svg-icons";

const ChatPageComponent = () => {
    const { user } = useAuth(); // do pobierania id uz

    const [whichChatToDisplay,setWichChatToDisplay] = useState("person");
    const [whichMessagesToDisplay,setWichMessagesToDisplay] = useState("");
    const [chatsInfo, setChatsInfo] = useState([]);
    const [slectedChatParticipants, setSelectedChatParticipants] = useState([]);
    const [messages, SetMessages] = useState([]);
    const [newChat, setNewChat] = useState(false);
    const [initialRender, setInitialRender] = useState(true); // Dodatkowy stan
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
            setWichMessagesToDisplay("");
        };
    
        window.addEventListener("resize", handleResize);
    
        return () => {
          window.removeEventListener("resize", handleResize);
        };
      }, []); 


    useEffect(() => { //use effect do wyświetlania dymkow czatu
        if (initialRender) {
            setInitialRender(false);
            return;
        }
        switch (whichChatToDisplay) {
            case "person":
                if(user){
                    setChatsInfo([]);
                    axios.get(`http://localhost:7000/clouds/participants/${user._id}`)
                    .then(response => {
                    setChatsInfo(response.data);
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
                    setChatsInfo(response.data);
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
            const selectedChat = chatsInfo.find(chat => chat.chatId === chatId);
            setSelectedChatParticipants(selectedChat.participants);
        })
        .catch(error => {
            console.log('Error fetching messages info', error);
        })
        }
    },[whichMessagesToDisplay])

    const updateWichChatToDisplay = (data) => {
        setWichChatToDisplay(data);
    };
    const updateWichMessagesToDisplay =  (chatId) => {
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
    const checkIfUsingMobileVersion = () => {
        return window.innerWidth < 800;
    }


    const displayChatClouds = () => {
        if (checkIfUsingMobileVersion() && whichMessagesToDisplay !== ""){
            return false;
        }
        else if (checkIfUsingMobileVersion() && whichMessagesToDisplay === "") {
            return true;
        }
        if (!checkIfUsingMobileVersion()) {
            return true;
        }
    }


    return (
        <div className="chat-page">
            <div className="chat-clouds-section">
                <ChatTypes // wyświetlanie typów chatu
                    updateWichChatToDisplay={updateWichChatToDisplay} 
                    // przekazywanie informacji o typie chatu i czyszczenie pobranych wiadomości z bazy danych
                    clearDisplayedMessage={updateWichMessagesToDisplay} />  
                {displayChatClouds() && (
                <ChatClouds // wyświetlanie dmków chatu
                    passChatCloudsDBData={chatsInfo}
                    updateWichMessagesToDisplay={updateWichMessagesToDisplay}/>)}
                {whichChatToDisplay === "person" && displayChatClouds() && (
                    <ChatNewMessageComponent // wyświetlanie okienka do tworzenia nowego chatu
                    handleNewChat={handleNewChatAdded}/> // po stworzeniu nowego chatu ponowne pobranie danych dymków chatu
                )}
            </div>
            <div className="chat-messages-section">
                {whichMessagesToDisplay !== "" && (
                    <ChatMessages // wyświetlanie wiadomości z chatu
                    passWichMessageToDisplay={messages} // przekazywanie danych wiadomości do wyświetlenia
                    chatParticipants={slectedChatParticipants} // przekazanie informacji o uczestnikach chatu
                    passConversationId={whichMessagesToDisplay} // przekazanie informacji id chatu
                    passChatType={whichChatToDisplay} // przekazanie informacji o typie chatu
                    />
                )}
            </div>
            </div>
        );
    }
export default ChatPageComponent;
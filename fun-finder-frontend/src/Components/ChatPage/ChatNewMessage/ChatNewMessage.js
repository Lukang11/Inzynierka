import React, { useState, useRef } from 'react';
import axios from 'axios';
import "./ChatNewMessage.css"
import { useAuth } from "../../../Utils/AuthProvider";

export const ChatNewMessage = ({handleNewChat}) => {
    const { user } = useAuth(); // do pobierania id uz

    const [showModal, setShowModal] = useState(false);
    const [searchedUser, setSearchedUser ] = useState([]);
    const inputEmailRef = useRef(null);

    const toggleModal = () => {
        setShowModal(!showModal);
    };

    const searchForUser = async (email) => {
        axios.get(`http://localhost:7000/users/user-data-email/${email}`)
                .then(response => {
                setSearchedUser(response.data);
                })
                .catch(error => {
                console.error('Error finding user with this email', error);
                });

    }
    const createNewChat = async (searchedUserId) => {
        try {
            await axios.post(`http://localhost:7000/clouds/event/createPrivateChat`,
            {
                userCreatingChatId: user._id,
                chatParticipantId: searchedUserId
            })
            setShowModal(false);
            handleNewChat();
            setSearchedUser([]);
        }
        catch (error) {
            console.log("failed to create new PrivateChat");
        }
    }


    return (
        <div className='chat-new-message'>
            <button
                className='new-chat-btn'
                onClick={toggleModal}
            >
                Nowa wiadomość
            </button>
            {showModal && (
                <div className='modal-overlay'>
                    <div className='modal'>
                        <div className='button-and-header-wrapper'>
                            <div className='close-btn' onClick={toggleModal}>
                                &times;
                            </div>
                            <div className='modal-header'>
                                <h2 className='message-modal-h2'>Wpisz email użytkownika</h2>
                            </div>
                        </div>
                        <div className='modal-finding-user-wrapper'>
                            <input
                            className="modal-email-input"
                            type="text"
                            ref={inputEmailRef}
                            />
                            <div className='modal-user-found'>
                                {searchedUser.length !== 0 ? (
                                    <button 
                                    className='modal-user-as-button'
                                     onClick={ () => createNewChat(searchedUser._id) }
                                    >
                                    <p>{searchedUser.fname} {searchedUser.lname} </p>
                                </button>
                                ): (
                                    <p>Nie znaleziono</p>
                                )}
                            </div>
                            <button className='modal-search-button'
                             onClick={ () => searchForUser(inputEmailRef.current.value)}>
                                Szukaj
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChatNewMessage;

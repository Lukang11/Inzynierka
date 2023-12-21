import React, { useState } from 'react';
import { FaMusic, FaFootballBall, FaPaintBrush } from 'react-icons/fa';
import './CreateEvent.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../Utils/AuthProvider"; 

function CreateEvent() {
  const { user } = useAuth(); // do pobierania id uz

  const [name, setName] = useState('');
  const [time, setTime] = useState('');
  const [people, setPeople] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState(''); 

  const handleIconClick = (category) => {
    setCategory(category);
  };
  const navigate = useNavigate(); 

  const createNewEventChat = async (userCreatingChatId, chatName) => {
    try {
        await axios.post(`http://localhost:7000/clouds/event/createEventChat`,
        {
          userCreatingChatId: userCreatingChatId,
          chatName: chatName
        })
    }
    catch (error) {
        console.log("failed to create new EventChat");
    }
}

  const handleSubmit = (event) => {
    event.preventDefault();
    createNewEventChat(user._id,name);
    console.log(`Event Name: ${name}, Event Time: ${time}, Number of People: ${people}, Category: ${category}, Event Date: ${date}`);
    alert('Wydarzenie zostało utworzone'); 
    navigate('/events');
  };

  return (
    
      <div>
        <div className='events-header'> Wydarzenia</div>
        <div className='container'> 
          <div className='events-card'>
            <div className='info-header'>Informacje</div>
            <div className='label-text'>Nazwa:</div>
            <input type="text" className='input-textbox' value={name} onChange={e => setName(e.target.value)} />
            <div className='label-text'>Godzina:</div>
            <input type="text" className='input-textbox' value={time} onChange={e => setTime(e.target.value)} />
            <div className='label-text'>Ilość osób:</div>
            <input type="text" className='input-textbox' value={date} onChange={e => setPeople(e.target.value)} />
          </div>
          <div className='events-card'>
            <div className='info-header'>Lokalizacja</div>
            <iframe className='events-map' src="https://www.google.com/maps/embed?pb=..." width="" height="450" style={{ border: 0 }} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
          </div>
          <div className='events-card'>
            <div className='info-header'>Kategoria</div>
          </div>
        </div>
        <div className='create-eventt-button-container'>
            <button className='create-eventt-button' onClick={handleSubmit}>Utwórz wydarzenie</button>
          </div>
      </div>
    )
   
}

export default CreateEvent;
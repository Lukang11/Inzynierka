import React, { useState } from 'react';
import { FaMusic, FaFootballBall, FaPaintBrush } from 'react-icons/fa';
import './CreateEvent.css';
import { useNavigate } from 'react-router-dom'; 

function CreateEvent() {
  const [name, setName] = useState('');
  const [time, setTime] = useState('');
  const [people, setPeople] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState(''); 

  const handleIconClick = (category) => {
    setCategory(category);
  };
  const navigate = useNavigate(); 

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`Event Name: ${name}, Event Time: ${time}, Number of People: ${people}, Category: ${category}, Event Date: ${date}`);
    alert('Wydarzenie zostało utworzone'); 
    navigate('/events');
  };

  return (
    
      <div>
        <div className='header-1'> Wydarzenia</div>
        <div className='container'> 
          <div className='card'>
            <div className='header-2'>Informacje</div>
            <div className='label-text'>Nazwa:</div>
            <input type="text" className='input-textbox' value={name} onChange={e => setName(e.target.value)} />
            <div className='label-text'>Godzina:</div>
            <input type="text" className='input-textbox' value={time} onChange={e => setTime(e.target.value)} />
            <div className='label-text'>Ilość osób:</div>
            <input type="text" className='input-textbox' value={date} onChange={e => setPeople(e.target.value)} />
          </div>
          <div className='card'>
            <div className='header-2'>Lokalizacja</div>
            <iframe src="https://www.google.com/maps/embed?pb=..." width="" height="450" style={{ border: 0 }} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
          </div>
          <div className='card'>
            <div className='header-2'>Kategoria</div>
          </div>
          <button className='create-eventt-button' onClick={handleSubmit}>Utwórz wydarzenie</button>
        </div>
      </div>
    )
   
}

export default CreateEvent;
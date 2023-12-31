import React, { useState } from 'react';
import { FaMusic, FaFootballBall, FaPaintBrush } from 'react-icons/fa';
import './CreateEvent.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../Utils/AuthProvider"; 
import { GoogleMap, Marker,LoadScript } from '@react-google-maps/api';



function CreateEvent() {
  const { user } = useAuth(); // do pobierania id uz

  const [name, setName] = useState('');
  const [people, setPeople] = useState('');
  const [category, setCategory] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [latLng, setLatLng] = useState({ lat: 0, lng: 0 });
  const [map, setMap] = useState(null);
  const apiKey= process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

  const [clickedLatLng, setClickedLatLng] = useState(null);

  const mapClickHandler = (event) => {
    setClickedLatLng({
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    });
    setLatLng(clickedLatLng);
  };
  const mapContainerStyle = {
    width: '100%',
    height: '450px',
  };

  const defaultCenter = {
    lat: 52.2297,
    lng: 21.0122,
  };

  const onLoad = (map) => {
    setMap(map);
  };

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
        <div className='label-text'>Data rozpoczęcia:</div>
        <input type="datetime-local" className='input-textbox' value={startDate} onChange={e => setStartDate(e.target.value)} />
        <div className='label-text'>Data zakończenia</div>
        <input type="datetime-local" className='input-textbox' value={endDate} onChange={e => setEndDate(e.target.value)} />
        <div className='label-text'>Ilość osób:</div>
        <input type="text" className='input-textbox' value={people} onChange={e => setPeople(e.target.value)} />
        <div className='label-text'>Opis wydarzenia:</div>
        <textarea id="input-textbox-2" name="input-textbox-2" rows="6" cols="40"> </textarea>
        
      </div>
      <div className='events-card'>
        <div className='info-header'>Lokalizacja</div>
        <LoadScript googleMapsApiKey={apiKey}>
          <div style={mapContainerStyle}>
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              center={defaultCenter}
              zoom={10}
              onClick={mapClickHandler}
              onLoad={onLoad}
            >
                {clickedLatLng && <Marker position={{ lat: clickedLatLng.lat, lng: clickedLatLng.lng }} />}

            </GoogleMap>
          </div>
        </LoadScript>
        <div className='photo-display'>Tu będzie dodawane zdjęcie ale jeszcze nie ma serwisu</div>
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
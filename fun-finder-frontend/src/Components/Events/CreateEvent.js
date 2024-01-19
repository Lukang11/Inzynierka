import React, { useState,useEffect } from 'react';
import { FaMusic, FaFootballBall, FaPaintBrush } from 'react-icons/fa';
import './CreateEvent.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../Utils/AuthProvider"; 
import { GoogleMap, Marker,LoadScript,Gecoder } from '@react-google-maps/api';
import { hobbiesData } from '../../Data/HobbiesData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 





function CreateEvent() {
  const { user } = useAuth(); // do pobierania id uz
  const [selectedCategory, setSelectedCategory] = useState('');
  const [name, setName] = useState('');
  const [people, setPeople] = useState('');
  const [category, setCategory] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [latLng, setLatLng] = useState({ lat: 0, lng: 0 });
  const [map, setMap] = useState(null);
  const [address,setAddress]=useState('')
  const [description,setDescription]=useState('')
  const apiKey= process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
  const [defaultCenter,setDefaultLocation] = useState({ lat: 0, lng: 0 });

  const [clickedLatLng, setClickedLatLng] = useState(null);
  const handleCategorySelect = (categoryName) => {
    setSelectedCategory(categoryName);
  };

  const mapClickHandler = (event) => {
    setClickedLatLng({
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    });
    setLatLng(clickedLatLng);
  };

  useEffect(() => {
    if (clickedLatLng) {
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ location: clickedLatLng }, (results, status) => {
        if (status === 'OK') {
          if (results[0]) {
            setAddress(results[0].formatted_address);
            console.log(address)
          } else {
            console.log('No results found');
          }
        } else {
          console.log('Geocoder failed due to: ' + status);
        }
      });
    }
  }, [clickedLatLng]);
  const mapContainerStyle = {
    width: '100%',
    height: '450px',
  };
  useEffect(() => {
    // Get user's geolocation
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          (setDefaultLocation(userLocation));
        },
        (error) => {
          console.error('Error getting geolocation:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }, [map]);



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

  
    const handleSubmit = async (event) => {
      event.preventDefault();
      try {
        const response = await axios.post('http://localhost:7000/events/add', {
          name: name,
          location: address,
          geolocation: latLng,
          eventStart:startDate,
          eventEnd:endDate,
          eventDescription:description,
          eventParticipants:people,
          relatedHobbies:category

          
        });
  
        console.log('Dane zostały pomyślnie zapisane:', response.data);
        
        navigate('/events');
      } catch (error) {
        console.error('Wystąpił błąd podczas zapisywania danych:', error);
      }
    };

  return (
    <div>
    <div className='events-header'> Dodaj wydarzenie</div>
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
        <input type="number" className='input-textbox' value={people} onChange={e => setPeople(e.target.value)} />
        <div className='label-text'>Opis wydarzenia:</div>
        <textarea id="input-textbox-2" name="input-textbox-2" rows="6" cols="40" value={description} onChange={e=>setDescription(e.target.value)}> </textarea>
        
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
        <div className='categories-container'>
        {hobbiesData.map((category) => (
      <div
        key={category.id}
        className={`category-item ${selectedCategory === category.name ? 'selected' : ''}`}
        onClick={() => handleCategorySelect(category.name)}
      >
        <FontAwesomeIcon icon={category.icon} className='category-icon' />
        <span className='category-name'>{category.name}</span>
      </div>
    ))}
      </div>
      </div>
    </div>
    <div className='create-eventt-button-container'>
        <button className='create-eventt-button' onClick={handleSubmit}>Utwórz wydarzenie</button>
      </div>
  </div>
)

}
export default CreateEvent;
import React, { useState,useEffect } from 'react';
import { FaMusic, FaFootballBall, FaPaintBrush } from 'react-icons/fa';
import './CreateEvent.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../Utils/AuthProvider"; 
import { GoogleMap, Marker,LoadScript,StandaloneSearchBox} from '@react-google-maps/api';
import { hobbiesData } from '../../Data/HobbiesData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 






function CreateEvent( ) {
  const { user } = useAuth(); 
  const [selectedCategory, setSelectedCategory] = useState('');
  const [errors, setErrors] = useState([]); 
  const [name, setName] = useState('');
  const libraries = process.env.REACT_APP_GOOGLE_MAPS_LIBRARIES.split(',');
  const [people, setPeople] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [latLng, setLatLng] = useState({ lat: 0, lng: 0 });
  const [map, setMap] = useState(null);
  const [address,setAddress]=useState('')
  const [description,setDescription]=useState('')
  const apiKey= process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
  const [addressSearch, setAddressSearch] = useState(null);
  const [clickedLatLng, setClickedLatLng] = useState(null);
  const handleCategorySelect = (categoryName) => {
    setSelectedCategory(categoryName);
  };
  const validate = () => {
    let tempErrors = {};
    tempErrors.name = name ? "" : "Pole jest wymagane";
    tempErrors.people = people ? "" : "Pole jest wymagane";
    tempErrors.category = selectedCategory ? "" : "Nie wybrano kategorii";
    tempErrors.startDate = startDate ? "" : "Pole jest wymagane";
    tempErrors.endDate = endDate ? "" : "Pole jest wymagane";
    tempErrors.description = description ? "" : "Pole jest wymagane";
    tempErrors.address = address ? "" : "Pole jest wymagane";
    setErrors(tempErrors);
    return Object.values(tempErrors).every(x => x == "");
  };




  
    const mapClickHandler = (event) => {
      const newLatLng = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      };
      setClickedLatLng(newLatLng); 
      setLatLng(newLatLng); 
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
  const handleSelectAddress = () => {
    if (!addressSearch) {
      console.error("addressSearch nie został zainicjowany");
      return;
  }
    const places = addressSearch.getPlaces();
    if (places && places.length > 0) {
      const location = places[0].geometry.location;
      const updatedLatLng = { lat: location.lat(), lng: location.lng() };
      console.log("Selected location:", updatedLatLng);
      setLatLng(updatedLatLng);
      setAddress(places[0].formatted_address);

      if (map) {
        map.panTo(updatedLatLng);
      }
    }
  };


  const onLoad = (map) => {
    setMap(map);
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
      createNewEventChat(user.id, name)
      event.preventDefault();
      if (!validate()) {
        return;
      }
      try {
        const response = await axios.post('http://localhost:7000/events/add', {
          name: name,
          location: address,
          geolocation: latLng,
          eventStart:startDate,
          eventEnd:endDate,
          eventDescription:description,
          eventParticipants:people,
          relatedHobbies:selectedCategory

          
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
        <input type="text" className={`input-textbox ${errors.name ? 'input-error' : ''}`}  value={name} placeholder={errors.name||'Podaj nazwę wydarzenia'} onChange={e => {setName(e.target.value);setErrors({...errors, name: ''});}} />
        <div className='label-text'>Data rozpoczęcia:</div>
        <input type="datetime-local" className='input-textbox' value={startDate} placeholder={errors.startDate||'Podaj datę rozpoczęcia'} onChange={e => {setStartDate(e.target.value);setErrors({...errors, name: ''});}} />
        <div className='label-text'>Data zakończenia</div>
        <input type="datetime-local" className={`input-textbox ${errors.name ? 'input-error' : ''}`}  value={endDate} placeholder={errors.endDate||'Podaj datę zakończenia'} onChange={e => {setEndDate(e.target.value);setErrors({...errors, name: ''});}} />
        <div className='label-text'>Ilość osób:</div>
        <input type="number" className={`input-textbox ${errors.name ? 'input-error' : ''}`}  value={people} placeholder={errors.people||'Podaj ilość osób'} onChange={e => {setPeople(e.target.value);setErrors({...errors, name: ''});}}  />
        <div className='label-text'>Opis wydarzenia:</div>
        <textarea id="input-textbox-2" name={`input-textbox-2 ${errors.name ? 'input-error' : ''}`}  rows="6" cols="40" value={description} placeholder={errors.description||'Napisz coś o swoim wydarzeniu'} onChange={e => {setDescription(e.target.value);setErrors({...errors, name: ''});}}> </textarea>
        
      </div>
      <div className='events-card'>
        <div className='info-header'>Lokalizacja</div>
        
        <LoadScript 
        googleMapsApiKey={apiKey}
        libraries = {libraries}
        >
         <StandaloneSearchBox
            onLoad={(ref) => setAddressSearch(ref)}
            onPlacesChanged={handleSelectAddress}
          >
            <input
              type="text"
              placeholder="Search for places"
              style={{ width: "100%", padding: "12px" }}
            />
          </StandaloneSearchBox>
          <div style={mapContainerStyle}>
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              zoom={10}
              onClick={mapClickHandler}
              onLoad={onLoad}
            >
                
                {latLng && <Marker position={latLng} />}

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
import React, { useState,useEffect,useRef } from 'react';
import { Loader } from "@googlemaps/js-api-loader";
import './CreateEvent.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../Utils/AuthProvider"; 
import { hobbiesData } from '../../Data/HobbiesData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import EventCardPrewiev from './EventCardPrewiev';


function CreateEvent( ) {
  const { user } = useAuth(); 
  const [selectedCategory, setSelectedCategory] = useState('');
  const [errors, setErrors] = useState([]); 
  const [name, setName] = useState('');
  const [people, setPeople] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [latLng, setLatLng] = useState({ lat: 0, lng: 0 });
  const [address,setAddress]=useState('')
  const [description,setDescription]=useState('')
  const apiKey= process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
  const [marker, setMarker] = useState(null);
  const mapRef = useRef(null);
  const searchBoxRef = useRef(null);
  const [imageUrl, setImageUrl] = useState('');
  const [map, setMap] = useState(null);
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

  useEffect(() => {
    const loader = new Loader({
      apiKey: apiKey,
      version: "weekly",
      libraries: ["places"],
    });
  
    loader.load().then(() => {
      const map = new window.google.maps.Map(mapRef.current, {
        zoom: 8, 
      });
      setMap(map);
  
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          map.setCenter(userLocation);
          map.setZoom(15);
  
          new window.google.maps.Marker({
            position: userLocation,
            map: map,
            title: "Twoja lokalizacja"
          });
        }, (error) => {
          console.error("Błąd geolokalizacji:", error)
        });
      }
  
      const searchBox = new window.google.maps.places.SearchBox(searchBoxRef.current);
      searchBox.addListener('places_changed', () => {
        const places = searchBox.getPlaces();
        if (places.length === 0) return;
  
        const bounds = new window.google.maps.LatLngBounds();
        places.forEach(place => {
          if (!place.geometry) return;
          if (place.geometry.viewport) {
            bounds.union(place.geometry.viewport);
          } else {
            bounds.extend(place.geometry.location);
          }
        });
  
        map.fitBounds(bounds);
        const selectedPlace = places[0];
        const selectedLatLng = { lat: selectedPlace.geometry.location.lat(), lng: selectedPlace.geometry.location.lng() };
        setLatLng(selectedLatLng);
        setAddress(selectedPlace.formatted_address);
  
        if (marker) {
          marker.setPosition(selectedLatLng);
        } else {
          const newMarker = new window.google.maps.Marker({
            position: selectedLatLng,
            map: map,
          });
          setMarker(newMarker);
        }
      });
  
    });
  }, [apiKey]);
  

  useEffect(() => {
    if (marker && latLng.lat !== 0 && latLng.lng !== 0) {
      marker.setPosition(latLng);
    }
  }, [latLng, marker]);
  
 
  
  

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
          maxEventParticipants:people,
          relatedHobbies:selectedCategory,
          eventPhoto:imageUrl,

          
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
        <div className='info-header'>Lokalizacja i Podgląd</div>
      <div>
      <input className='input-textbox' ref={searchBoxRef} type="text" placeholder="Podaj adres wydarzenia" />
      </div>
      <div className='events-map' ref={mapRef} ></div>
      <input className='input-textbox' type="text" placeholder='Dodaj URL zdjęcia' value={imageUrl} onChange={e => {setImageUrl(e.target.value) }}/> 
      <EventCardPrewiev name={name} location={address} description={description} startDate={startDate} endDate={endDate} people={people} category={selectedCategory} imageUrl={imageUrl} />
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
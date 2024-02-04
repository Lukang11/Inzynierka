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
  const [selectedCategoryName,setSelectedCategoryName]=useState('')
  const [errors, setErrors] = useState([]); 
  const [name, setName] = useState('');
  const [people, setPeople] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [latLng, setLatLng] = useState({ lat: '0', lng: '0 '});
  const [address,setAddress]=useState('')
  const [description,setDescription]=useState('')
  const apiKey= process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
  const [marker, setMarker] = useState(null);
  const mapRef = useRef(null);
  const searchBoxRef = useRef(null);
  const [imageUrl, setImageUrl] = useState('');
  const [map, setMap] = useState(null);
  const handleCategorySelect = (category) => {
    
    setSelectedCategory(category);
    setImageUrl(category.image); 
    setSelectedCategoryName(category.name)
  };
  
  const validate = () => {
    let tempErrors = {};
    let isValid = true;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
  
    tempErrors.name = name ? "" : "Pole jest wymagane";
    tempErrors.people = people > 0 ? "" : "Pole jest wymagane i musi być dodatnią liczbą";
    tempErrors.category = selectedCategory ? "" : "Nie wybrano kategorii";
    tempErrors.startDate = startDate ? "" : "Pole jest wymagane";
    tempErrors.endDate = endDate ? "" : "Pole jest wymagane";
    tempErrors.description = description ? "" : "Pole jest wymagane";
    tempErrors.address = address ? "" : "Pole jest wymagane";
    tempErrors.imageUrl = imageUrl ? "" : "URL obrazu jest wymagany";
  
    
    if (startDate && new Date(startDate) < today) {
      tempErrors.startDate = "Data rozpoczęcia nie może być wcześniejsza niż dzisiejsza data";
      isValid = false;
    }
  
    
    if (startDate && endDate && new Date(endDate) < new Date(startDate)) {
      tempErrors.endDate = "Data zakończenia nie może być wcześniejsza niż data rozpoczęcia";
      isValid = false;
    }
  
    
    if (imageUrl && !imageUrl.startsWith('http')) {
      tempErrors.imageUrl = "URL powinien zaczynać się od http";
      isValid = false;
    }
  
    setErrors(tempErrors);
    return isValid && Object.values(tempErrors).every(x => x === "");
  };
 
  useEffect(() => {
    const loader = new Loader({
      apiKey: apiKey,
      version: "weekly",
      libraries: ["places"],
    });

    loader.load().then(() => {
      const googleMaps = window.google.maps;
      const initialPosition = { lat: -34.397, lng: 150.644 };

      const map = new googleMaps.Map(mapRef.current, {
        center: initialPosition,
        zoom: 8,
      });
      setMap(map);

      const searchBox = new googleMaps.places.SearchBox(searchBoxRef.current);

      let marker = null;

      searchBox.addListener("places_changed", () => {
        const places = searchBox.getPlaces();
        if (places.length === 0) return;

        if (marker) {
          marker.setMap(null);
        }

        const bounds = new googleMaps.LatLngBounds();
        places.forEach((place) => {
          if (!place.geometry || !place.geometry.location) return;

          marker = new googleMaps.Marker({
            map: map,
            title: place.name,
            position: place.geometry.location,
          });

          if (place.geometry.viewport) {
            bounds.union(place.geometry.viewport);
          } else {
            bounds.extend(place.geometry.location);
          }
        });

        map.fitBounds(bounds);
      });
    });
  }, [apiKey]);

  
 
  
  

  const navigate = useNavigate(); 

  const createNewEventChat = async (userCreatingChatId, chatName, imageUrl, event_id) => {
    try {
        await axios.post(`http://localhost:7000/clouds/event/createEventChat`,
        {
          userCreatingChatId: userCreatingChatId,
          chatName: chatName,
          imageUrl: imageUrl,
          event_id: event_id, 
        })
    }
    catch (error) {
        console.log("failed to create new EventChat");
    }
}

const handleAddEventToUser = async (event_id) => {
  const eventDataBody = {
    eventId: event_id,
    name: name,
    eventDescription: description,
    eventStart: startDate,
    eventEnd: endDate,
    location: address,
    eventPhoto: imageUrl
  };

  try {
    const addEventToUser = await axios.post(`http://localhost:7000/users/add-event/${user.email}`, eventDataBody, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!addEventToUser.status === 200) {
      throw new Error(`Błąd HTTP! Status: ${addEventToUser.status}`);
    }

  } catch (error) {
    console.error('Wystąpił błąd podczas wykonywania żądania:', error.message);
    throw error;
  }
};

  
    const handleSubmit = async (event) => {
      event.preventDefault();
      if (!validate()) {
        return;
      }
      try {
        const response = await axios.post('http://localhost:7000/events/add', {
          name: name,
          location: address,
          geoLocation: { latitude: latLng.lat.toString(), longitude: latLng.lng.toString() },
          eventStart: startDate,
          eventEnd: endDate,
          eventDescription: description,
          maxEventParticipants: people,
          eventParticipantsEmail: [user.email],
          relatedHobbies: selectedCategory.data,
          relatedHobbiesName: selectedCategoryName,
          eventPhoto: imageUrl,
        });
        createNewEventChat(user._id, name, imageUrl,response.data);
        handleAddEventToUser(response.data);
  
        console.log('Dane zostały pomyślnie zapisane:', response.data);
        console.log('even chat created:', user._id)
        
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
        <input type="datetime-local" className={`input-textbox ${errors.startDate ? 'input-error' : ''}`} value={startDate} placeholder={errors.startDate || 'Podaj datę rozpoczęcia'} onChange={e => {setStartDate(e.target.value); setErrors({...errors, startDate: ''});}} />
        <div className='label-text'>Data zakończenia</div>
        <input type="datetime-local" className={`input-textbox ${errors.endDate ? 'input-error' : ''}`} value={endDate} placeholder={errors.endDate || 'Podaj datę zakończenia'} onChange={e => {setEndDate(e.target.value); setErrors({...errors, endDate: ''});}} />
        <div className='label-text'>Ilość osób:</div>
        <input type="number" className={`input-textbox ${errors.name ? 'input-error' : ''}`}  value={people} placeholder={errors.people||'Podaj ilość osób'} onChange={e => {setPeople(e.target.value);setErrors({...errors, name: ''});}}  />
        <div className='label-text'>Opis wydarzenia:</div>
        <textarea id="input-textbox-2" className={`input-textbox ${errors.description ? 'input-error' : ''}`} rows="6" cols="40" value={description} placeholder={errors.description || 'Napisz coś o swoim wydarzeniu'} onChange={e => {setDescription(e.target.value); setErrors({...errors, description: ''});}}></textarea>

      </div>
      <div className='events-card'>
        <div className='info-header'>Lokalizacja i Podgląd</div>
      <div>
      <input className={`input-textbox ${errors.address ? 'input-error' : ''}`} ref={searchBoxRef} type="text" placeholder={errors.address || "Podaj adres wydarzenia"} value={address} onChange={e => { setAddress(e.target.value); setErrors({...errors, address: ''}); }} />
      </div>
      <div className='events-map' ref={mapRef} ></div>
      <input className={`input-textbox ${errors.imageUrl ? 'input-error' : ''}`} type="text" placeholder={errors.imageUrl || 'Dodaj URL zdjęcia'} value={imageUrl} onChange={e => {setImageUrl(e.target.value); setErrors({...errors, imageUrl: ''});}} />
      <EventCardPrewiev className='preview-card' name={name} location={address} description={description} startDate={startDate} endDate={endDate} people={people} category={selectedCategory} imageUrl={imageUrl} />
      </div>
      <div className='events-card'>
        <div className='info-header'>Kategoria</div>
        <div className='categories-container'>
        {hobbiesData.map((category) => (
  <div
    key={category.id}
    className={`category-item ${selectedCategory && selectedCategory.id === category.id ? 'selected' : ''}`}
    onClick={() => handleCategorySelect(category)}
  >
    <FontAwesomeIcon icon={category.icon} className='category-icon' />
    <span className='category-name'>{category.name}</span>
  </div>
))}

  {errors.category && <div className="error-message">{errors.category}</div>}
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
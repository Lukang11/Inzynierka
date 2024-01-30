import React, { useState, useEffect } from "react";
import { GoogleMap, Marker, LoadScript } from '@react-google-maps/api';
import "./EventInfo.css";
import { useAuth } from "../../Utils/AuthProvider";
import { Loader } from "@googlemaps/js-api-loader";
import axios from "axios";

export const EventInfo = () => {
  const currentURL = window.location.href;
  const { user } = useAuth();
  const parts = currentURL.split('/event-info/');
  const eventId = parts[1];
  const [isMapsLoaded, setIsMapsLoaded] = useState(false);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [eventData, setEventData] = useState(null);
  const [isUserRegistered, setIsUserRegistered] = useState(false);
  const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
  function refreshPage() {
    window.location.reload(false);
}
  useEffect(() => {
    const loader = new Loader({
      apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
      version: "weekly",
      libraries: ["places"],
    });

    loader.load().then(() => {
      setIsMapsLoaded(true);
    });

    const fetchEventData = async () => {
      try {
        const response = await fetch(`http://localhost:7000/events/by-id/${eventId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setEventData(data);
      } catch (error) {
        console.error('Error fetching event data:', error);
      }
    };

    if (eventId) {
      fetchEventData();
    }
  }, [eventId]);

  useEffect(() => {
    const checkIfUserIsRegistered = () => {
      if (eventData && eventData.eventParticipantsEmail && user) {
        setIsUserRegistered(eventData.eventParticipantsEmail.includes(user.email));
      }
    };

    const geocodeAddress = () => {
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ address: eventData.location }, (results, status) => {
        if (status === 'OK' && results[0]) {
          const location = results[0].geometry.location;
          setLatitude(location.lat());
          setLongitude(location.lng());
        } else {
          console.error('Geocoding failed:', status);
        }
      });
    };

    if (eventData && eventData.location && isMapsLoaded) {
      geocodeAddress();
    }

    checkIfUserIsRegistered();
  }, [eventData, isMapsLoaded, user]);

  const addUserToEventChat = async () => {
    await axios.post('http://localhost:7000/clouds/event/addUserToChat',
    {
      userId: user._id,
      eventId: eventId
      
    })

  const handleAddEventToUser = async () => {
    const eventDataBody = {
      eventId: eventData._id,
      name: eventData.name,
      eventDescription: eventData.eventDescription,
      eventStart: eventData.eventStart,
      eventEnd: eventData.eventEnd,
      location: eventData.location,
      eventPhoto:  eventData.eventPhoto
    }
    const addEventToUser = await fetch(`http://localhost:7000/users/add-event/${user.email}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(eventDataBody),
    });

    if(!addEventToUser.ok){
      throw new Error(`Błąd HTTP! Status: ${addEventToUser.status}`);
    }
  }

  const handleRegisterEvent = async () => {
    // refreshPage();
    if (eventData && eventData.users && eventData.users.includes(user.email))  {
      setIsUserRegistered(true);
      alert('Jesteś już zarejestrowany na to wydarzenie!');
      return;
    }
  
    try {
      const userEmail = user.email;
  
      const response = await fetch(`http://localhost:7000/events/add/user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'

        },
        body: JSON.stringify({ eventId: eventId, userEmail: userEmail }),
        
      });
  
      if (!response.ok) {
        throw new Error(`Błąd HTTP! Status: ${response.status}`);
      }
      // trzeba tu dodać jeszcze bad response do tego jak bedzie max uzytkowników
      addUserToEventChat();
      console.log(response.status);
      const result = await response.json();
      setIsUserRegistered(true); 
      alert('Pomyślnie zarejestrowano na wydarzenie!');
    } catch (error) {
      console.error('Błąd rejestracji na wydarzenie:', error)
    }
  };
  
  const handleClick = async () => {
    await handleRegisterEvent();
    await handleAddEventToUser();
  };

  return (
    <div className="event-info-container">
      {eventData ? (
        <>
          <div className="overlap">
            
            <div className="event-name">{eventData.name}</div>
          <div className="event-address">{eventData.location}</div>
          <p className="event-information">{eventData.eventDescription}</p>
          <button className={`register-on-event-button ${isUserRegistered ? 'register-on-event-button-disabled' : ''}`} onClick= {handleClick} disabled={isUserRegistered}>
              {isUserRegistered ? 'Jesteś już zapisany na to wydarzenie' : 'Zapisz się na wydarzenie'}
            </button>
          </div>
          <div className="event-map-container">
          <p className="event-enrolled-users">
            <span className="enrolled-users">Zapisanych uczestników: </span>
            <span className="event-number-of-users">{eventData.eventParticipantsEmail.length}</span>
          </p>
              {latitude !== null && longitude !== null && (
                <GoogleMap 
                  mapContainerClassName="event-map"
                  className="event-map"
                  center={{ lat: latitude, lng: longitude }}
                  zoom={15}
                >
                  <Marker position={{ lat: latitude, lng: longitude }} />
                </GoogleMap>
              )}
            
          </div>
        </>
      ) : (
        <p>Ładowanie danych...</p>
      )}
    </div>
  );
};

export default EventInfo;

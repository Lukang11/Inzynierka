import React, { useState, useEffect } from "react";
import { GoogleMap, Marker, LoadScript } from '@react-google-maps/api';
import "./EventInfo.css";
import { jwtDecode } from "jwt-decode";

export const EventInfo = () => {
  const currentURL = window.location.href;
  const parts = currentURL.split('/event-info/');
  const eventId = parts[1]; 
  const [isMapsLoaded, setIsMapsLoaded] = useState(false); 
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [eventData, setEventData] = useState(null);
  const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
  const [currentUser, setCurrentUser] = useState(null);
  const JwtToken = localStorage.getItem('token');
  const mapContainerStyle = {
    width: '100%',
    height: '450px',
  };
   
  

   console.log(JwtToken)
  useEffect(() => {
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
  }, [eventData, isMapsLoaded]);
  const fetchCurrentUserData = async (userId) => {
    try {
      const response = await fetch(`http://localhost:7000/user-data-id/${userId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const userData = await response.json();
      setCurrentUser(userData);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const addUserToEvent = async () => {
    if (!currentUser) {
      console.error('No user data available');
      return;
    }

    try {
      const response = await fetch(`http://localhost:7000/events/add-user-to-event/${eventId}/${currentUser.id}`, {
        method: 'POST',
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      console.log('User added to event:', data);
      
    } catch (error) {
      console.error('Error adding user to event:', error);
    }
  };

  useEffect(() => {
    const currentUserId = 'current-user-id';
    fetchCurrentUserData(currentUserId);
  }, []);

  return (
    <div className="event-info-container">
      {eventData ? (
        <>
          <div className="overlap">
            <p className="event-information">{eventData.eventDescription}</p>
          </div>
          <div className="event-map-container">
            <LoadScript 
              googleMapsApiKey={apiKey}
              onLoad={() => setIsMapsLoaded(true)} 
            >
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
            </LoadScript>
          </div>
          <div className="event-name">{eventData.name}</div>
          <div className="event-address">{eventData.location}</div>
          <button className="event-join-button" onClick={addUserToEvent}>Dołącz do wydarzenia</button>
          <p className="event-enrolled-users">
            <span className="enrolled-users">Zapisanych uczestników: </span>
            <span className="event-number-of-users">{eventData.numberOfUsers}</span>
          </p>
        </>
      ) : (
        <p>Ładowanie danych...</p>
      )}
    </div>
  );
};

export default EventInfo;

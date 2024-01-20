import React, { useState, useEffect } from "react";
import { GoogleMap, Marker, LoadScript } from '@react-google-maps/api';
import "./EventInfo.css";

export const EventInfo = () => {
  const currentURL = window.location.href;
  const parts = currentURL.split('/event-info/');
  const eventId = parts[1]; 
  const [isMapsLoaded, setIsMapsLoaded] = useState(false); 
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [eventData, setEventData] = useState(null);
  const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
  const mapContainerStyle = {
    width: '100%',
    height: '450px',
  };

  
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

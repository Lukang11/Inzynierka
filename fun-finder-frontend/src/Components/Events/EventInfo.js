import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { GoogleMap, Marker,LoadScript,Gecoder } from '@react-google-maps/api';
import "./EventInfo.css";

export const EventInfo = () => {
  const currentURL=window.location.href
  const parts = currentURL.split('/event-info/');
  const eventId = parts[1]; 
  const [map, setMap] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  console.log(eventId); 
  const [eventData, setEventData] = useState(null);
  console.log(eventId);
  const apiKey= process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
 

  useEffect(() => {
    const fetchEventData = async (id) => {
      try {
        const response = await fetch(`http://localhost:7000/events/by-id/${id}`);
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
      fetchEventData(eventId);
    }
  }, [eventId]);

  const onLoad=(map)=> {
    setMap(map);
  };

  const handleCoordinates = () => {
    const geocoder = new window.google.maps.Geocoder();
    if (eventData && eventData.location) {
      geocoder.geocode({ address: eventData.location }, (results, status) => {
        if (status === 'OK') {
          if (results[0]) {
            const location = results[0].geometry.location;
            setLatitude(location.lat());
            setLongitude(location.lng());
          } else {
            console.log('Brak wyników');
          }
        } else {
          console.log('Geokoder nie działa z powodu: ' + status);
        }
      });
    }
  };

  useEffect(() => {
    handleCoordinates();
  }, [eventData]);


  
 

  return (
    <div className="event-info-container">
      {eventData ? (
        <>
          <div className="overlap">
            <p className="event-information">{eventData.description}</p>
          </div>
          <div className="event-map-container">
          <LoadScript googleMapsApiKey={apiKey}>
              <GoogleMap className = "event-map"
                center={{ lat: latitude, lng: longitude }}
                zoom={15}
              >
                <Marker position={{ lat: eventData.latitude, lng: eventData.longitude }} />
              </GoogleMap>
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

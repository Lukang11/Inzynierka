import { React, useState, CSSProperties, useEffect } from "react";
import "./EventBattlerMoreUserView.css";
import ClipLoader from "react-spinners/DotLoader";
import axios from "axios";
import GoogleApiFetchPlacesView from "../GoogleApiFetchPlacesView/GoogleApiFetchPlacesView";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "#5908bf",
};

function EventBattlerMoreUserView({ participants }) {
  const [loading, setLoading] = useState(false);
  const [placesFound, setPlacesFound] = useState(false);
  const [resData, setResData] = useState();
  const [latitude_f, setLatitude_f] = useState();
  const [longitude_f, setLongitude_f] = useState();
  const color = "#5908bf";
  const user_url = "http://localhost:7000/battle";
  const handleFetch = async () => {
    const participantsHobbiesList = await axios.post(`${user_url}`, {
      participants,
      latitude: latitude_f,
      longitude: longitude_f,
    });
    setResData(participantsHobbiesList.data);
    setPlacesFound(true);
  };
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        setLatitude_f(() => position.coords.latitude);
        setLongitude_f(() => position.coords.longitude);
      });
    } else {
      console.log("Geolocation is not available in your browser.");
    }
  }, []);
  return (
    <div className="event-battler-more-user-view-cont">
      {!placesFound ? (
        <div>
          <div> Grupa liczy : {participants.length} </div>
          <div> Rozpocząć wyszukiwanie atrakcji? </div>
          <div>
            <button className="event-b-m-u-v-btn" onClick={handleFetch}>
              Szukaj
            </button>
          </div>
        </div>
      ) : (
        <GoogleApiFetchPlacesView data={resData} />
      )}
    </div>
  );
}

export default EventBattlerMoreUserView;

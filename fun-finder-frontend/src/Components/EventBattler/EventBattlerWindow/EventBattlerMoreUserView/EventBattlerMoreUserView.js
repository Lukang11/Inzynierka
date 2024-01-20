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
  const [placesFromDB, setPlacesDB] = useState(false);
  const color = "#5908bf";
  const user_url = "http://localhost:7000/battle";
  const handleFetch = async () => {
    setLoading((val) => !val);
    const participantsHobbiesList = await axios.post(`${user_url}`, {
      participants,
    });
    console.log("lalala");
    console.log(participantsHobbiesList.data.length);
    if (participantsHobbiesList.data.length === 0) {
      console.log("list is empty");
      setPlacesFound(true);
      setPlacesDB(false);
    }
    if (participantsHobbiesList.data.length > 0) {
      console.log("hello");
      setPlacesFound(false);
      setPlacesDB(true);
    }
  };
  return (
    <div className="event-battler-more-user-view-cont">
      {console.log(participants)}
      {!placesFound ? (
        <div>
          <div> Grupa liczy : {participants.length} </div>
          <div> Rozpocząć wyszukiwanie atrakcji? </div>
          <div>
            <button className="event-b-m-u-v-btn" onClick={handleFetch}>
              Szukaj
            </button>
          </div>
          <div>
            {" "}
            {loading ? (
              <ClipLoader
                color={color}
                loading={loading}
                cssOverride={override}
                size={30}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            ) : null}
          </div>
        </div>
      ) : (
        <GoogleApiFetchPlacesView />
      )}
    </div>
  );
}

export default EventBattlerMoreUserView;

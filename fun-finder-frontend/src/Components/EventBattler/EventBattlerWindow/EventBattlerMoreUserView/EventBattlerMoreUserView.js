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
  const color = "#5908bf";
  const user_url = "http://localhost:7000/battle";
  const handleFetch = async () => {
    const participantsHobbiesList = await axios.post(`${user_url}`, {
      participants,
    });
    setResData(participantsHobbiesList.data);
    setPlacesFound(true);
  };
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
          <div>
            {" "}
            {/* {loading ? (
              <ClipLoader
                color={color}
                loading={loading}
                cssOverride={override}
                size={30}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            ) : null} */}
          </div>
        </div>
      ) : (
        <GoogleApiFetchPlacesView data={resData} />
      )}
    </div>
  );
}

export default EventBattlerMoreUserView;

import React, { useEffect, useState } from "react";
import "./ProfileHobbies.css";
import { useAuth } from "../../../../Utils/AuthProvider";
import axios from "axios";

const ProfileHobbies = () => {
  const [hobbiesData, sethobbiesData] = useState();
  const url = "http://localhost:7000/events/";
  const { user } = useAuth();
  useEffect(() => {
    async function fetchData() {
      const hobbies = await axios.get(`${url}hobbies/${user._id}`);
      sethobbiesData(() => hobbies.data);
    }
    fetchData();
  }, []);
  const data = [
    { id: 1, hobby: "KINO" },
    { id: 2, hobby: "PRZYGODA" },
    { id: 3, hobby: "PUB" },
    { id: 4, hobby: "TEATR" },
    { id: 5, hobby: "MALARSTWO" },
    { id: 6, hobby: "SZTUKA" },
    { id: 7, hobby: "JEDZENIE" },
    { id: 8, hobby: "SPORT" },
    { id: 9, hobby: "SZTUKA" },
    { id: 10, hobby: "WINO" },
    { id: 11, hobby: "PIWO" },
    { id: 12, hobby: "GRY PLANSZOWE" },
  ];
  return (
    <div className="hobbies-card">
      {console.log(hobbiesData)}
      <div className="hobbies-first-row">
        <h2>Zainteresowania</h2>
        <div className="hobbies-add-button">+</div>
      </div>
      <div className="hobbies-second-row">
        <div className="hobbies-contener-wrapper">
          {hobbiesData
            ? hobbiesData.map((element, index) => (
                <div key={index} className="hobbies-contener-wrapper-item">
                  <div>{index}</div>
                  <div>{element}</div>
                </div>
              ))
            : null}
        </div>
      </div>
    </div>
  );
};

export default ProfileHobbies;

import React from "react";
import "./ProfileHobbies.css";

const ProfileHobbies = () => {
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
      <div className="hobbies-first-row">
        <h2>Zainteresowania</h2>
        <div className="hobbies-add-button">+</div>
      </div>
      <div className="hobbies-second-row">
        <div className="hobbies-contener-wrapper">
          {data.map((element) => (
            <div key={element.id} className="hobbies-contener-wrapper-item">
              <div>{element.id}</div>
              <div>{element.hobby}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileHobbies;

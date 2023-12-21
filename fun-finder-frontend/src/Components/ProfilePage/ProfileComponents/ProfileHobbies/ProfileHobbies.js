import React, { useEffect, useState } from "react";
import "./ProfileHobbies.css";
import { useAuth } from "../../../../Utils/AuthProvider";
import axios from "axios";
import HobbiesModal from "../HobbiesModal/HobbiesModal";

const ProfileHobbies = () => {
  const [hobbiesData, sethobbiesData] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const url = "http://localhost:7000/events/";
  const { user } = useAuth();
  useEffect(() => {
    const fetchData = async () => {
      if (user && user.email) {
        try {
          const hobbies = await axios.get(`${url}hobbies/${user.email}`);
          sethobbiesData(() => hobbies.data);
        } catch (error) {
          console.error("Error fetching hobbies:", error);
        }
      }
    };
    fetchData();
  }, [user]);
  function onclick() {
    setIsOpen((val) => !val);
  }
  return (
    <div className="hobbies-card">
      <div className="hobbies-first-row">
        <h2>Zainteresowania</h2>
        {console.log(isOpen)}
        <div className="hobbies-add-button" onClick={() => onclick()}>
          +
        </div>
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
      {isOpen ? <HobbiesModal onClick={onclick} /> : null}
    </div>
  );
};

export default ProfileHobbies;

import React, { useEffect, useState } from "react";
import "./ProfileHobbies.css";
import { useAuth } from "../../../../Utils/AuthProvider";
import axios from "axios";
import HobbiesModal from "../HobbiesModal/HobbiesModal";
import { hobbiesData } from "../../../../Data/HobbiesData";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ProfileHobbies = () => {
  const [hobbies, sethobbies] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const url = "http://localhost:7000/events/";
  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      if (user && user.email) {
        try {
          const hobbiesResponse = await axios.get(`${url}hobbies/${user.email}`);
          const userHobbies = Array.from(new Set(hobbiesResponse.data));
          sethobbies(() => userHobbies);
        } catch (error) {
          console.error("Error fetching hobbies:", error);
        }
      }
    };

    fetchData();
  }, [user]);

  function onClick() {
    setIsOpen((val) => !val);
  }

  function getHobbyIcon(hobbyName) {
    const matchingHobby = hobbiesData.find(hobby => hobby.name === hobbyName);
    const matchingIcon = matchingHobby ? matchingHobby.icon : null;
    return matchingIcon;
  }

  return (
    <div className="hobbies-card">
      <div className="hobbies-first-row">
        <h2>Zainteresowania</h2>
        <div className="hobbies-add-button" onClick={onClick}>
          +
        </div>
      </div>
      <div className="hobbies-second-row">
        <div className="hobbies-contener-wrapper">
          {hobbies
            ? hobbies.map((element, index) => (
              <div key={index} className="hobbies-contener-wrapper-item">
                <div className="hobby-icon">
                  {getHobbyIcon(element) && (
                    <FontAwesomeIcon icon={getHobbyIcon(element)} />
                  )}
                </div>
                <div>{element}</div>
              </div>
            ))
            : null}
        </div>
      </div>

      {isOpen ? <HobbiesModal onClick={onClick} /> : null}
    </div>
  );
};

export default ProfileHobbies;

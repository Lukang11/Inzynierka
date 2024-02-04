import React, { useState, useEffect } from "react";
import "./HobbiesModalCss.css";
import HobbiesItem from "./HobbiesItem/HobbiesItem";
import axios from "axios";
import { useAuth } from "../../../../Utils/AuthProvider";
import { hobbiesData } from "../../../../Data/HobbiesData.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function HobbiesModal({ onClick, getIcon }) {
  const [hobbies, setHobbies] = useState([]);
  const { user } = useAuth();

  const [relatedHobbies, setRelatedHobbies] = useState(hobbiesData);

  const addItem = (item) => {
    const correctItem = hobbiesData.find((hobby) => hobby.name === item);

    setHobbies((prevHobbies) => [
      ...prevHobbies,
      { name: correctItem.name, data: correctItem.data },
    ]);
  };

  const removeItem = (index) => {
    setHobbies((prevHobbies) => {
      const updatedHobbies = [...prevHobbies];
      updatedHobbies.splice(index, 1);
      return updatedHobbies;
    });
  };
  const removeRelatedItem = (index) => {
    setRelatedHobbies((prevHobbies) => {
      const updatedHobbies = [...prevHobbies];
      updatedHobbies.splice(index, 1);
      return updatedHobbies;
    });
  };

  const addRelatedItem = (item) => {
    setRelatedHobbies((prevHobbies) => {
      const hobbyData = hobbiesData.find((hobby) => hobby.name === item);
      const updatedState = [...prevHobbies, hobbyData];

      return updatedState;
    });
  };

  function refreshPage() {
    window.location.reload(false);
  }
  const sendUserHobbies = () => {
    const fetchData = async () => {
      if (user && user.email) {
        try {
          let url = "http://localhost:7000/users/";
          const hobbiesTags = hobbies.map((hobby) => hobby.data);
          const hobbiesTagsResult = [].concat(...hobbiesTags);

          const hobbiesNames = hobbies.map((hobby) => hobby.name);
          const hobbiesNamesResult = [].concat(...hobbiesNames);

          await axios.post(`${url}update-user-hobbies/${user.email}`, {
            hobbies: hobbiesTagsResult,
            hobbiesName: hobbiesNamesResult,
          });
        } catch (error) {
          console.error("Error fetching hobbies:", error);
        }
        refreshPage();
      }
    };
    fetchData();
  };

  useEffect(() => {}, [hobbies, relatedHobbies]);

  return (
    <div className="hobbies-modal-wrapper">
      <div className="hobbies-wrapper-form">
        <div
          className="close-modal"
          onClick={() => {
            onClick();
            refreshPage();
          }}
        >
          X
        </div>
        <div className="hobbies-form">
          <div className="hobbies-added-items">
            {" "}
            <div className="add-hobby-text">Dodaj zainteresowanie</div>
            <div>
              <div className="sel-hobbies-wrap">
                {hobbies.map((val, index) => {
                  return (
                    <div
                      key={index}
                      onClick={() => {
                        addRelatedItem(val.name);
                        removeItem(index);
                      }}
                      className="hobbies-item"
                    >
                      <div className="hobbies-prf-icon">
                        <FontAwesomeIcon icon={getIcon(val.name)} />
                      </div>
                      {val.name}
                    </div>
                  );
                })}
              </div>
            </div>
            <button className="modal-send-btn" onClick={sendUserHobbies}>
              Zapisz
            </button>
          </div>
          {relatedHobbies.length > 0 && (
            <div className="hobbies-items">
              <h3>Dostępne kategorie:</h3>
              <div className="hobbies-item-wrapper">
                {relatedHobbies.map((value, index) => (
                  <HobbiesItem
                    key={index}
                    name={value.name}
                    icon={value.icon}
                    onClick={addItem}
                    onClickDel={removeRelatedItem}
                    index={index}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default HobbiesModal;

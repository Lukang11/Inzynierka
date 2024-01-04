import React, { useState, useEffect } from "react";
import "./HobbiesModalCss.css";
import HobbiesItem from "./HobbiesItem/HobbiesItem";
import axios from "axios";
import { useAuth } from "../../../../Utils/AuthProvider";
import { hobbiesData } from "../../../../Data/HobbiesData.js";

function HobbiesModal({ onClick }) {
  const [hobbies, setHobbies] = useState([]);
  const { user } = useAuth();

  const [relatedHobbies, setRelatedHobbies] = useState(hobbiesData);

  const addItem = (item) => {
    setHobbies((prevHobbies) => [...prevHobbies, item]);
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
      const updatedState = [...prevHobbies, { name: item, icon: hobbyData?.icon }];
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
          let url = "http://localhost:7000/events/";
          await axios.post(`${url}hobbies/add/${user.email}`, { hobbies });
        } catch (error) {
          console.error("Error fetching hobbies:", error);
        }
      }
    };
    fetchData();
  };
  useEffect(() => {
    console.log(hobbies);
  }, [hobbies, relatedHobbies]);

  return (
    <div className="hobbies-modal-wrapper">
      <div className="hobbies-wrapper-form">
        <div className="close-modal" onClick={() => {onClick(); refreshPage()}}>
          X
        </div>
        <div className="hobbies-form">
          {" "}
          <div className="add-hobby-text">Dodaj zainteresowanie</div>
          <div>
            <div className="sel-hobbies-wrap">
              {hobbies.map((val, index) => {
                console.log(val);
                return (
                  <div
                    key={index}
                    onClick={() => {
                      console.log(val);
                      addRelatedItem(val);
                      removeItem(index);
                    }}
                    className="sel-hobbies-item"
                  >
                    {val}
                  </div>
                );
              })}
            </div>
          </div>
          <button className="modal-send-btn" onClick={sendUserHobbies}>
            Zapisz
          </button>
          {relatedHobbies.length > 0 && (
            <div>
              <h3>Dostępne kategorie:</h3>
              <div className="hobbies-item-wrapper">
                {relatedHobbies.map((value, index) => (
                  <HobbiesItem
                    key={index} // Add a unique key
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

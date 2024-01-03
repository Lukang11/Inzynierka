import React from "react";
import "./ProfileDescription.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSquareFacebook,
  faSquareInstagram,
  faSquareTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import { useAuth } from "../../../../Utils/AuthProvider";
import { hobbiesData } from "../../../../Data/HobbiesData.js";

const ProfileDescription = () => {
  const { user } = useAuth();

  console.log('User:', user);
  console.log('Description:', user ? user.description : 'No description');
  if (!user) {
    return (
      <div className="desc-cont">
        <h3>Ładowanie...</h3>
      </div>
    );
  }
  

  return (
    <div className="desc-cont">
      <h3>{`${user.fname} ${user.lname}`}</h3>
      <div>
        <p>{`${user.description}`}</p>
      </div>
      <br />
      
    </div>
  );
};

export default ProfileDescription;

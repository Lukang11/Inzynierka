import React, { useState, useEffect } from "react";
import "./ProfileDescription.css";
import { useAuth } from "../../../../Utils/AuthProvider";
import axios from "axios";
import ProfileDetails from "../ProfileDetails/ProfileDetails";
import "../ProfileDetails/ProfileDetails.css";
import EditProfileModal from "../EditProfileModal/EditProfileModal";


const ProfileDescription = () => {
  const { user } = useAuth();
  const [description, setDescription] = useState('');
  const [error, setError] = useState(null);
  const [avatar, setAvatar] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen((val) => !val);
  };

  useEffect(() => {
    if (user) {
      getUserDescription(user.email);
      getUserAvatar(user.email)
    }
  }, [user]); 


  const getUserDescription = async (email) => {
    try {
      const response = await axios.get(`http://localhost:7000/users/user-description/${email}`);
      setDescription(response.data.description);
    } catch (err) {
      setError(err.response ? err.response.data : 'An error occurred');
    }
  }

  const getUserAvatar = async (email) => {
    try {
      const response = await axios.get(`http://localhost:7000/users/user-avatar/${email}`);
      setAvatar(response.data.avatar);
    } catch (err) {
      setError(err.response ? err.response.data : 'An error occurred');
    }
  }

  if (!user) {
    return (
      <div className="desc-cont">
        <h3>Ładowanie...</h3>
      </div>
    );
  }

  return (
    <>
    <div className="profile-desc-avatar-container">
    <div className="desc-cont">
      <h3>{`${user.fname} ${user.lname}`}</h3>
      <div>
        {description ? (
          <p>{description}</p>
        ) : (
          <p>Jeszcze nie ustawiono</p>
        )}
        {error && <div>Error: {error}</div>}
      </div>
      <br />
    </div>



    <div className="avatar-box">
      <div className="profile-page-avatar">
        <img src={avatar} alt="Avatar" />
      </div>
      <div className="edit-profile-button" onClick={toggleModal}>
            Edytuj profil
      </div>

      {isOpen ? <EditProfileModal onClick={toggleModal} /> : null}
    </div>
    </div>
    </>
  );
 }

export default ProfileDescription;

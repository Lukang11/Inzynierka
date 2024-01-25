import React, { useState, useEffect } from "react";
import "../ProfileDetails/ProfileDetails.css";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import { useAuth } from "../../../../Utils/AuthProvider";
import axios from "axios";

const ProfileDetails = () => {
  const { user } = useAuth();
  const [avatar, setAvatar] = useState('');
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen((val) => !val);
  };

  useEffect(() => {
    if (user) {
      getUserAvatar(user.email);
    }
  }, [user]); 

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
    <div className="profile-page-wrapper">
      <div className="profile-page-image"><img src={avatar} alt="Avatar" /></div>
        <div className="profile-desc-item">
          <div className="edit-profile-btn" onClick={toggleModal}>
            Edytuj profil
          </div>
        </div>
      {isOpen ? <EditProfileModal onClick={toggleModal} /> : null}
    </div>
  );
};

export default ProfileDetails;

import React, { useState } from "react";
import "../ProfileDetails/ProfileDetails.css";
import EditProfileModal from "../EditProfileModal/EditProfileModal";

const ProfileDetails = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen((val) => !val);
  };

  return (
    <div className="profile-page-wrapper">
      <div className="profile-page-image"></div>
      <div className="profile-page-image-cont">
        <div className="profile-desc-item">
          <div className="edit-profile-btn" onClick={toggleModal}>
            Edytuj profil
          </div>
        </div>
      </div>
      {isOpen ? <EditProfileModal onClick={toggleModal} /> : null}
    </div>
  );
};

export default ProfileDetails;

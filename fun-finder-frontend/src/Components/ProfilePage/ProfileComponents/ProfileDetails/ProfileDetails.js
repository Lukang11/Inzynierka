import React from "react";
import "../ProfileDetails/ProfileDetails.css";
import monkey from "../../../../Images/Monkey_test.jpg";

const ProfileDetails = () => {
  return (
    <div className="profile-page-wrapper">
      <div className="profile-page-image"></div>
      <div className="profile-page-image-cont">
        <div className="profile-desc-item">
          <div className="edit-profile-btn">Edytuj profil</div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;

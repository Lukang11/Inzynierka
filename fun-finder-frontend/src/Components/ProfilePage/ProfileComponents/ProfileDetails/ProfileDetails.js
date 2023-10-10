import React from "react";
import "../ProfileDetails/ProfileDetails.css";
import monkey from "../../../../Images/Monkey_test.jpg";

const ProfileDetails = () => {
  return (
    <div className="profile-page-wrapper">
      <div className="profile-page-image"></div>
      <div className="profile-page-image-cont">
        <div className="profile-desc-item">
          <div className="desc-item">81</div>
          <div className="desc-item">Punkty</div>
        </div>
        <div className="profile-desc-item">
          {" "}
          <div className="desc-item">32</div>
          <div className="desc-item">Obserwujących</div>
        </div>
        <div className="profile-desc-item">
          {" "}
          <div className="desc-item">51</div>
          <div className="desc-item">Obserwatorów</div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;

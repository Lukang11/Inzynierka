import React from "react";
import "./ProfilePage.css";
import ProfileHobbies from "./ProfileComponents/ProfileHobbies/ProfileHobbies";
import ProfileDescription from "./ProfileComponents/ProfileDescription/ProfileDescription";
import ProfileDetails from "./ProfileComponents/ProfileDetails/ProfileDetails";
import ProfileEvents from "./ProfileComponents/ProfileEvents/ProfileEvents";

const ProfilePage = () => {
  return (
    <div>
      <div className="description-wrapper">
        <div className="profile-desc">
          <ProfileDescription></ProfileDescription>
        </div>
        <div className="profile-card">
          <ProfileDetails></ProfileDetails>
        </div>
      </div>
      <div>
        <ProfileEvents></ProfileEvents>
      </div>
      <div>
        <ProfileHobbies></ProfileHobbies>
      </div>
    </div>
  );
};

export default ProfilePage;

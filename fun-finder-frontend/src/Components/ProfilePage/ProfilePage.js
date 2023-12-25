import React from "react";
import "./ProfilePage.css";
import ProfileHobbies from "./ProfileComponents/ProfileHobbies/ProfileHobbies";
import ProfileDescription from "./ProfileComponents/ProfileDescription/ProfileDescription";
import ProfileDetails from "./ProfileComponents/ProfileDetails/ProfileDetails";
import ProfileEvents from "./ProfileComponents/ProfileEvents/ProfileEvents";
import ProfileUserEvents from "./ProfileComponents/ProfileUserEvents/ProfileUserEvents";

const ProfilePage = () => {
  return (
    <div className="profile-page-content">
      <div className="description-wrapper">
        <div className="profile-desc">
          <ProfileDescription></ProfileDescription>
        </div>
        <div className="profile-card">
          <ProfileDetails></ProfileDetails>
        </div>
      </div>
      <div className="second-row-wrapper">
        <div className="profile-event-wrapper">
          <ProfileUserEvents></ProfileUserEvents>
        </div>
        <div className="profile-hobbies-wrapper">
          <ProfileHobbies></ProfileHobbies>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

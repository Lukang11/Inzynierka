import React from "react";
import ProfileHobbies from "./ProfileComponents/ProfileHobbies/ProfileHobbies";
import ProfileDescription from "./ProfileComponents/ProfileDescription/ProfileDescription";
import ProfileDetails from "./ProfileComponents/ProfileDetails/ProfileDetails";
import ProfileEvents from "./ProfileComponents/ProfileEvents/ProfileEvents";

const ProfilePage = () => {
  return (
    <div>
      <div>
        <ProfileDescription></ProfileDescription>
      </div>
      <div>
        <ProfileDetails></ProfileDetails>
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

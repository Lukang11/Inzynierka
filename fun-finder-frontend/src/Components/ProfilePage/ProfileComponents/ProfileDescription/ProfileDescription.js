import React, { useState, useEffect } from "react";
import "./ProfileDescription.css";
import { useAuth } from "../../../../Utils/AuthProvider";
import axios from "axios";

const ProfileDescription = () => {
  const { user } = useAuth();
  const [description, setDescription] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch user description when the component mounts
    if (user) {
      getUserDescription(user.email);
    }
  }, [user]); // Make sure to include user as a dependency

  const getUserDescription = async (email) => {
    try {
      const response = await axios.get(`http://localhost:7000/users/user-description/${email}`);
      setDescription(response.data.description);
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
  );
 }

export default ProfileDescription;

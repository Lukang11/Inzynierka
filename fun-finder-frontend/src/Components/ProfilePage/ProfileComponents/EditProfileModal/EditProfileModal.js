import React, { useState, useEffect } from "react";
import "./EditProfileModalCss.css";
import axios from "axios";
import { useAuth } from "../../../../Utils/AuthProvider";

function EditProfileModal({ onClick }) {
    const { user } = useAuth()
    const [description, setDescription] = useState("");
    const [avatar, setAvatar] = useState("");

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    const handleAvatarChange = (e) => {
        setAvatar(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
      
        if (description.trim() !== "") {
          try {
            const response = await axios.post(`http://localhost:7000/users/update-user-description/${user.email}`, {description});
      
            if (response.status === 200) {
              const updatedUser = response.data.user;
              setDescription((prevUser) => ({ ...prevUser, ...updatedUser }));
            }
      
          } catch (error) {
            console.error('Wystąpił błąd podczas wysyłania żądania:', error);
          }
        }
      
        if (avatar.trim() !== "") {
          try {
            const response = await axios.post(`http://localhost:7000/users/update-user-avatar/${user.email}`, { avatar });
      
            if (response.status === 200) {
              const updatedUser = response.data.user;
              setAvatar((prevUser) => ({ ...prevUser, ...updatedUser }));
            }
      
          } catch (error) {
            console.error('Wystąpił błąd podczas wysyłania żądania:', error);
          }
        }
      };

    function refreshPage() {
        window.location.reload(false);
    }

    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, []);

    return (
        <div className="profile-modal-wrapper">
            <div className="close-profile-modal" onClick={() => onClick()}>
                X
            </div>
            <div className="profile-modal-form">
                <form onSubmit={handleSubmit}>
                    <div>
                        <div className="profile-modal-text">Edytuj swój opis</div>
                        <div className="profile-description">
                            <textarea id="description" value={description} onChange={handleDescriptionChange} />
                        </div>
                    </div>
                    <div>
                        <div className="profile-modal-text">Ustaw zdjęcie profilowe:</div>
                        <div className="profile-modal-avatar">
                            <input type="text" placeholder="Podaj url zdjęcia" id="profilePhoto" onChange={handleAvatarChange} />
                        </div>
                    </div>
                    <button className="profile-save-btn" type="submit" onClick={refreshPage}>
                        Zapisz
                    </button>
                </form>

            </div>
        </div>
    );
}

export default EditProfileModal;

import React, { useState, useEffect } from "react";
import "./EditProfileModalCss.css";
import axios from "axios";
import { useAuth } from "../../../../Utils/AuthProvider";

function EditProfileModal({ onClick }) {
    const { user } = useAuth()
    const [description, setDescription] = useState("");
    const [profilePhoto, setProfilePhoto] = useState(null);

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    const handleProfilePhotoChange = (e) => {
        setProfilePhoto(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const desc = { description: description };

        try {
            const response = await axios.post(`http://localhost:7000/users/update-user-description/${user.email}`, desc);

            if (response.status === 200) {
                const updatedUser = response.data.user;
                setDescription((prevUser) => ({ ...prevUser, ...updatedUser }));     
            } 
          
        } catch (error) {
            console.error('Wystąpił błąd podczas wysyłania żądania:', error);
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
                        <div>
                            <input type="file" id="profilePhoto" onChange={handleProfilePhotoChange} />
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

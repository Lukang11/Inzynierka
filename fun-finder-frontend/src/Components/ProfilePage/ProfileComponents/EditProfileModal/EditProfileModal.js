import React, { useState, useEffect } from "react";
import "./EditProfileModalCss.css";

function EditProfileModal({ onClick }) {
    const [description, setDescription] = useState("");
    const [profilePhoto, setProfilePhoto] = useState(null);

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    const handleProfilePhotoChange = (e) => {
        setProfilePhoto(e.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    };

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
                    <button className="profile-save-btn" type="submit">Zapisz</button>
                </form>
            </div>
        </div>
          
    );
}

export default EditProfileModal;

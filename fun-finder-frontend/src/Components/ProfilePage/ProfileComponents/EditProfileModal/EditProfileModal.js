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
        // Handle form submission logic here
    };

    useEffect(() => {
        // Apply overflow: hidden; to body when the modal is open
        document.body.style.overflow = "hidden";
        // Cleanup function to remove the style when the component unmounts
        return () => {
            document.body.style.overflow = "auto";
        };
    }, []); 
    
    return (
        
        <div className="profile-modal-wrapper">
            <div className="close-profile-modal" onClick={() => onClick()}>
                X
            </div>
            <div className="profile-form">

                <form onSubmit={handleSubmit}>
                    <div>
                        <div className="profile-modal-text">Description:</div>
                        <div className="profile-description">
                            <input id="description" value={description} onChange={handleDescriptionChange} />
                        </div>
                    </div>
                    <div>
                        <div className="profile-modal-text">Profile Photo:</div>
                        <div>
                            <input type="file" id="profilePhoto" onChange={handleProfilePhotoChange} />
                        </div>
                    </div>
                    <button className="profile-save-btn" type="submit">Save</button>
                </form>
            </div>
        </div>
          
    );
}

export default EditProfileModal;

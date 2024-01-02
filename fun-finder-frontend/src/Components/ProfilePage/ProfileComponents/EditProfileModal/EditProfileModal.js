import React, { useState, useEffect } from "react";


function EditProfileModal({ onClick }) {
   

    return (
        <div className="hobbies-modal-wrapper">
            <div className="hobbies-wrapper-form">
                <div className="close-modal" onClick={() => { onClick()}}>
                    X
                </div>
        </div>
        </div>
    );
}

export default EditProfileModal;

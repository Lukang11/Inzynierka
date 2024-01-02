import React, { useState, useEffect } from "react";

function EditProfileModal({ onClick }) {
    return (
        <div className="hobbies-modal-wrapper" style={{ background: "white" }}>
            <div className="hobbies-wrapper-form" style={{ maxWidth: "600px", margin: "0 auto" }}>
                <div className="close-modal" onClick={() => onClick()}>
                    X
                </div>
                {/* Add your modal content here */}
            </div>
        </div>
    );
}

export default EditProfileModal;

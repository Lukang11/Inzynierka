import React, { useState, useEffect } from "react";
import "./SPUserModal.css";
import axios from "axios";

function SPUserModal({ onClick, user }) {
  const { fname, lname, hobbiesName, description, avatar } = user;


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
            <div className="sp-modal-bg">
                <div className="sp-modal-profile-img"><img src={avatar} alt="Avatar" /></div>
                <div className="sp-modal-fullname">{fname} {lname}</div>
                <div className="sp-modal-hobbies">{hobbiesName}</div>
                <div className="sp-modal-desc">{description}</div>
                <div className="sp-modal-btn-container">
                    <div className="sp-modal-contact-btn">Napisz do mnie!</div>
                </div>
            
            </div>

        </div>
     );
}

export default SPUserModal;

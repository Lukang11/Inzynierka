import React, { useState, useEffect } from "react";
import "./SPUserModal.css";
import axios from "axios";
import { useAuth } from "../../Utils/AuthProvider";

function SPUserModal({ onClick }) {
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
            <div className="sp-modal-bg">
                <div className="sp-modal-profile-img"><img src="https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt="Avatar" /></div>
                <div className="sp-modal-fullname">Imię Nazwisko</div>
                <div className="sp-modal-hobbies">miejsce na zainteresowania</div>
                <div className="sp-modal-desc">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent id purus lacinia, pulvinar ligula vel, consequat ipsum. Vivamus euismod consequat ultrices. Integer eget pretium sapien, ut luctus mauris. Sed eleifend magna id dui mollis iaculis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent id purus lacinia, pulvinar ligula vel, consequat ipsum. Vivamus euismod consequat ultrices. Integer eget pretium sapien, ut luctus mauris. Sed eleifend magna id dui mollis iaculis.</div>
                <div className="sp-modal-btn-container">
                    <div className="sp-modal-contact-btn">Napisz do mnie!</div>
                </div>
            
            </div>

        </div>
     );
}

export default SPUserModal;

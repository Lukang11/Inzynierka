import React, { useEffect } from "react";
import "./SPUserModal.css";
import axios from "axios";
import { useAuth } from "../../Utils/AuthProvider";
import { useNavigate } from "react-router-dom";

function SPUserModal({ onClick, selectedUser }) {
  const { _id, fname, lname, hobbiesName, description, avatar } = selectedUser;
  const { user } = useAuth();
  const navigate = useNavigate();

  const createNewChat = async () => {
    try {
        await axios.post(`http://localhost:7000/clouds/event/createPrivateChat`,
        {
            userCreatingChatId: user._id,
            chatParticipantId: _id
        })

    }
    catch (error) {
        console.log("failed to create new PrivateChat");
    }
}

    const onClickHandler = () => {
        createNewChat()
        navigate("/chat")
        window.location.reload();
    }




    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, []);

    const formatedHobbies = hobbiesName.map((name, index) => {
        if (index === hobbiesName.length - 1) {
            return name;
        } else {
            return name + ", ";
        }
    });

    return ( 
        <div className="profile-modal-wrapper">
            <div className="close-profile-modal" onClick={() => onClick()}>
                X
            </div>
            <div className="sp-modal-bg">
                <div className="sp-modal-profile-img"><img src={avatar} alt="Avatar" /></div>
                <div className="sp-modal-fullname">{fname} {lname}</div>
                <div className="sp-modal-hobbies">{formatedHobbies}</div>
                <div className="sp-modal-desc">{description}</div>
                <div className="sp-modal-btn-container">
                    <div className="sp-modal-contact-btn" onClick={onClickHandler}>Napisz do mnie!</div>
                </div>
            
            </div>

        </div>
     );
}

export default SPUserModal;

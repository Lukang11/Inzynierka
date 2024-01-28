import React from "react";
import "./UserCard.css";

function UserCard() {
  return (
    <div className="user-card-item" style={{ background: `url('https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500') center/cover` }}>
      <div className="info-box">
        <div className="item-fullname">Imię Nazwisko </div>
        <div className="item-hobbies-count">Ilość zainteresowań: 3</div>
      </div>
    </div>
  );
}

export default UserCard;

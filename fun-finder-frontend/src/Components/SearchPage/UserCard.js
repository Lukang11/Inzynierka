import React from "react";
import "./UserCard.css";

function UserCard({ user }) {
  const { fname, lname, hobbiesName, avatar } = user;

  return (
    <div className="user-card-item" style={{ background: `url('${avatar}') center/cover` }}>
      <div className="info-box">
        <div className="item-fullname">{fname} {lname}</div>
        <div className="item-hobbies-count">Ilość zainteresowań: {hobbiesName.length}</div>
      </div>
    </div>
  );
}

export default UserCard;
import React from "react";
import "./EventBattlerParticipants.css";

function EventBattlerParticipants() {

  const users = [
    {
      email: 'testowo@testowo.com',
      fname: 'adam',
      lname: 'tester',
      avatar: 'https://as1.ftcdn.net/v2/jpg/03/53/11/00/1000_F_353110097_nbpmfn9iHlxef4EDIhXB1tdTD0lcWhG9.jpg',
    },
    {
      email: 'nie@jechleba.pl',
      fname: 'seba',
      lname: 'seba',
      avatar: 'https://as1.ftcdn.net/v2/jpg/03/53/11/00/1000_F_353110097_nbpmfn9iHlxef4EDIhXB1tdTD0lcWhG9.jpg',
    },
  ];

  return (
  <div className="event-battler-participants-container">
    <ul>
      {users.map((user, index) => (
        <li key={index}>
          <div className="event-battler-participants-user-details">
            <img src={user.avatar} alt="Avatar" />
            <a>{user.email}<br /></a>
            <a>{user.fname} {user.lname}</a>
          </div>
          <hr />
        </li>
      ))}
    </ul>
  </div>
  );
}

export default EventBattlerParticipants;

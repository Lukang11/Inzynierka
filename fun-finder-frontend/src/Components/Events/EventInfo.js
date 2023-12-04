import React from "react";
import "./EventInfo.css";

export const EventInfo = () => {








  return (
    <div className="event-info-container">
        <div className="overlap">
          <p className="event-information">
            Dolor sit amet, consectetur adipiscing elit. Fusce hendrerit tincidunt libero ut tempor. Duis luctus feugiat
            tellus non ultrices. Nullam eget iaculis leo. Mauris et tellus est. Nullam quis risus justo. Curabitur
            luctus sed elit ac vehicula. Dolor sit amet, consectetur adipiscing elit. Fusce hendrerit tincidunt libero
            ut tempor.
          </p>
        </div>
        <iframe className='event-map' src="https://www.google.com/maps/embed?pb=..." width="" height="450" style={{ border: 0 }} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        <div className="event-name">Kajaki</div>
        <div className="event-address">Dokowa 1, 80-863 Gdańsk</div>
        <p className="event-enrolled-users">
          <span className="enrolled-users">Zapisanych uczestników: </span>
          <span className="event-number-of-users">8</span>
        </p>
      </div>
  );
};
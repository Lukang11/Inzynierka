import React from "react";
import CellImage from "../../../WelcomePage/Images/first-section-img.png";

const EventCell = ({ element, index }) => {
    return (
        // <li key={index} className="events-row bottom-border">
        // <div className="events-item-icon style-list-elem">test_icon</div>
        // <div className="events-item-data style-list-elem">
        //     {element.event_time_start}
        // </div>
        // <div className="events-item-data style-list-elem">
        //     {element.event_time_end}
        // </div>
        // <div className="events-item-name style-list-elem">
        //     {element.event_name}
        // </div>
        // <div className="events-item style-list-elem">OSOBY</div>
        // <div className="events-item style-list-elem">id</div>
        // </li>
        <div className="cell-container cell-bottom-border">
            <img src={CellImage} className="cell-image" />
            <div className="cell-text-container">
                <div className="cell-event-name">
                    {element.event_name}
                </div>
                <div className="cell-event-location">
                    {element.event_location}
                </div>
                <div className="cell-event-time">
                    {element.event_time_start} 
                </div>
            </div>
        </div>
    );
    }

export default EventCell;
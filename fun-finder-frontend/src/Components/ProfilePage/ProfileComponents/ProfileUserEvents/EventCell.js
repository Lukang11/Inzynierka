import React from "react";
import CellImage from "../../../WelcomePage/Images/first-section-img.png";

const EventCell = ({ element, index }) => {
    return (
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
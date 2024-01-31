import React from "react";
import { Link } from "react-router-dom";

const EventCell = ({ element, index }) => {
    const dateEventTimeStart = new Date(element.event_time_start);
    const dateEventTimeEnd = new Date(element.event_time_end);
    const formatedEventTimeStart = dateEventTimeStart.toLocaleDateString('pl-PL', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
    const formatedEventTimeEnd = dateEventTimeEnd.toLocaleDateString('pl-PL', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });

    const currentTime = new Date();
    const isEventInFuture = dateEventTimeEnd > currentTime;

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
        isEventInFuture && (
            <div className="event-cell-container">
                <Link to={`/event-info/${element.event_id}`}>
                    <div className="cell-container cell-bottom-border">
                        <img src={element.event_photo} className="cell-image" />
                        <div className="cell-text-container">
                            <div className="cell-event-name">
                                {element.event_name}
                            </div>
                            <div className="cell-event-location">
                                {element.event_location}
                            </div>
                            <div className="cell-event-time">
                                <span>Od: {formatedEventTimeStart} <br /></span> 
                                <span>Do: {formatedEventTimeEnd}</span>
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
        )
    );

}

export default EventCell;
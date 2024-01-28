import React from "react";
import "./EventCardPrewiev.css";
function EventCardPrewiev({ name,location,description,startDate,endDate,people,category,imageUrl }){
  function splitDateTime(startDate) {
    const [date, time] = startDate.split('T');
    return { date, time };
  }
  const startDateTime = splitDateTime(startDate);
    return (
        <div className="events-preview-card">
          <div className="events-preview-card-item">
            <div className="events-preview-image" style={{ 
            backgroundImage: imageUrl ? `url(${imageUrl})` : 'none'
          }}> 
           {!imageUrl && <div className="preview-placeholder">Podgląd wydarzenia</div>}
          </div>
            <div className="events-preview-description">
              <div className="events-preview-card-item-spec-left">
                <div className="events-prewiev-info-card-name">{name}</div>
                <div className="events-prewiev-info-card-location">{location}</div>
              </div>
              <div className="events-preview-card-item-spec-right">
                <div className="events-preview-card-hour">{startDateTime.time}</div>
                <div className="events-preview-card-date">{startDateTime.date}</div>
                <div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
    
    export default EventCardPrewiev;
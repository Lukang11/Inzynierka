import React, { useState } from "react";
import "./HobbiesItem.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons"; // Ikona "X"

function HobbiesItem(props) {
  const [hide, setHide] = useState(false);

  return (
    <div
      className="hobbies-item"
      onClick={() => {
        props.onClick(props.name);
        props.onClickDel(props.index);
      }}
    >
      <div className="hobbies-item-icon">
        {props.icon && <FontAwesomeIcon icon={props.icon} />}
      </div>
      <div className="hobbies-item-name">{props.name}</div>
      <div className={"hobbies-item-removal-x"}>X</div>
    </div>
  );
}

export default HobbiesItem;

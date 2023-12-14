import React, { useState } from "react";
import "./HobbiesItem.css";

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
      <div> {props.name}</div>
      <div className={"hobbies-item-removal-x"}>X</div>
    </div>
  );
}

export default HobbiesItem;

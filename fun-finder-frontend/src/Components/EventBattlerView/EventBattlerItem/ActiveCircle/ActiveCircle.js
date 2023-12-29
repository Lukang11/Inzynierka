import React from "react";
import "./ActiveCircle.css";

function ActiveCircle({ isActive }) {
  return (
    <div>
      {isActive ? (
        <div className="is-active"></div>
      ) : (
        <div className="is-not-active"></div>
      )}
    </div>
  );
}

export default ActiveCircle;

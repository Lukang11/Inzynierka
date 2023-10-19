import React from "react";
import "./ProfileDescription.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSquareFacebook,
  faSquareInstagram,
  faSquareTwitter,
} from "@fortawesome/free-brands-svg-icons";

const ProfileDescription = () => {
  return (
    <div>
      <div className="desc-cont">
        <h3>Testek Testowy</h3>
        <div>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam dapibus
          ornare risus, quis malesuada mauris. Sed mauris ligula, hendrerit id
          magna sed, scelerisque pulvinar lorem. Vivamus sem tellus, malesuada
          vel egestas consequat, condimentum id tellus. Aenean at mi at ipsum
          elementum rutrum. Integer massa ante, pharetra in viverra ut, vehicula
          vitae lectus. Donec et efficitur lectus. Phasellus nec lectus tortor.
          Morbi aliquet tincidunt enim eget dapibus. Duis volutpat faucibus
          dignissim. Sed nunc ligula, porttitor aliquet molestie non, euismod
          quis dolor. Curabitur scelerisque volutpat ligula, tristique posuere
        </div>
        <br></br>
        <div className="desc-links">
          <div className="desc-icon">
            <FontAwesomeIcon icon={faSquareFacebook} />
          </div>
          <div className="desc-icon">
            {" "}
            <FontAwesomeIcon icon={faSquareInstagram} />
          </div>
          <div className="desc-icon">
            {" "}
            <FontAwesomeIcon icon={faSquareTwitter} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDescription;

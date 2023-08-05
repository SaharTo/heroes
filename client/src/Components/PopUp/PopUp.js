import React, { useState } from "react";
import "./styles.css";
import Button from "../Buttons/Button";

const Popup = ({ onConfirm, textToDisplay }) => {
  return (
    <div className="popup">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        className="popup-content"
      >
        <h2>Boost Hero</h2>
        <p style={{ margin: "20px" }}>{textToDisplay}</p>
        <Button label={"Confirm"} onClick={onConfirm}></Button>
      </div>
    </div>
  );
};

export default Popup;

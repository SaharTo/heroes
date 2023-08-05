import React, { useEffect, useState } from "react";
import "./styles.css";
import Button from "../Buttons/Button";
import Popup from "../PopUp/PopUp";
import moment from "moment";

const HeroCard = ({ hero, updateHeroes }) => {
  const { name, ability, start_date, starting_power, current_power, id } = hero;

  const [isPopupOpen, setPopupOpen] = useState(false);
  const [resMessage, setResMessage] = useState("nothingToDisplay");

  const handleConfirm = () => {
    updateHeroes("ok");
    setPopupOpen(false);
  };

  const HandleBoost = async (id) => {
    try {
      const token = sessionStorage.getItem("access_token");
      if (token) {
        const headers = {
          token: `${token}`,
        };
        const response = await fetch(
          `http://localhost:3001/trainer/train/${id}`,
          {
            method: "POST",
            headers,
          }
        );

        const data = await response.json();
        if (data.statusCode == 200) {
          setResMessage(data.content.message);
          setPopupOpen(true);
        } else {
          setResMessage(data.content.message);
          setPopupOpen(true);
        }
      }
    } catch (error) {
      console.error("Error fetching heroes:", error);
    }
  };

  return (
    <div className="hero-card">
      <div style={{ marginInlineStart: "20px" }}>
        <h2>{name}</h2>
        <p>Ability: {ability}</p>
        <p>ID: {id}</p>
        <p>Date: {moment(start_date).format("MMMM D, YYYY")}</p>
        <p>Starting Power: {starting_power}</p>
        <p>Current Power: {current_power}</p>
      </div>
      <div
        style={{
          marginTop: "40px",
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <Button
          label="Boost Me ⚡"
          className="boosBtn"
          onClick={() => HandleBoost(id)}
        ></Button>
      </div>
      {isPopupOpen && (
        <Popup onConfirm={handleConfirm} textToDisplay={resMessage} />
      )}
    </div>
  );
};

export default HeroCard;

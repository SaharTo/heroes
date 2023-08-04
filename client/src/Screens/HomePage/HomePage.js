import React, { useContext } from "react";
import { MyContext } from "../../Context/MyContext"; // Import MyContext from MyContext.js
import "./styles.css"; // Import the CSS file
import Button from "../../Components/Buttons/Button";
import { useNavigate } from "react-router-dom";
import { superman } from "../../Assets";

export const HomePage = () => {
  const navigate = useNavigate();

  const redirectToRegister = () => {
    navigate("/register", { replace: true });
  };
  const redirectToLogin = () => {
    navigate("/login", { replace: true });
  };

  return (
    <div className="container">
      <div className="greeting">
        <div>
          <h1 className="greetingTitle">Welcome to the Hero company</h1>
        </div>
        <div className="fullContainer">
          <img className="superman" src={superman}></img>

          <Button
            label="Sign up"
            onClick={redirectToRegister}
            className="button"
          ></Button>
          <Button
            label="Login"
            onClick={redirectToLogin}
            className="button"
          ></Button>
        </div>
      </div>
    </div>
  );
};

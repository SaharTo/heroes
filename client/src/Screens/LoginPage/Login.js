import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css"; // Import the CSS file
import Button from "../../Components/Buttons/Button";
import Input from "../../Components/Input/Input";

export const LoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Perform login logic
    if (username === "demo" && password === "Aa12345678?") {
      // Successful login, navigate to another route
      navigate("/dashboard", { replace: true });
    } else {
      // Failed login, display error message
      setLoginError("Invalid username or password");
    }
  };
  const goBack = () => {
    navigate("/", { replace: true });
  };

  return (
    <div className="container">
      <div className="greeting">
        <Button label="<" onClick={goBack} className="backBtn" />
        <div>
          <h1 className="greetingTitle">Login to the Hero company</h1>
          <h2 className="greetingDescription">
            Enter your credentials to access your hero account
          </h2>
        </div>

        <div className="fullContainer">
          <form
            style={{
              display: "flex",
              flexDirection: "column",
              minWidth: "300px",
            }}
            onSubmit={handleSubmit}
          >
            <Input
              type="text"
              placeholder="Username"
              value={username}
              onChange={handleUsernameChange}
              className="login-input"
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
              className="login-input"
            />
            {loginError && <div className="error-message">{loginError}</div>}
            <Button
              type="submit"
              label="Login"
              onClick={handleSubmit}
              className="button"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

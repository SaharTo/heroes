import React, { useState } from "react";
import "./styles.css"; // Import the CSS file
import Button from "../../Components/Buttons/Button";
import Input from "../../Components/Input/Input";
import { isPasswordValid, isUsernameValid } from "../../Utils/Utils";
import { useNavigate } from "react-router-dom";

export const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [repeatPasswordError, setRepeatPasswordError] = useState("");
  const [usernameError, setUserNameError] = useState("");

  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    console.log(event.target.value);
    setUsername(event.target.value);
    validateUserNameStrength(event.target.value);
  };

  const validateUserNameStrength = (username) => {
    const isValid = isUsernameValid(username);
    setUserNameError(
      isValid ? "" : "Username should be at least 3 characters long"
    );
  };
  const validatePasswordStrength = (password) => {
    const isValid = isPasswordValid(password);
    setPasswordError(
      isValid
        ? ""
        : "Password must contain at least 8 characters, one capital letter, one digit, and one special character."
    );
  };
  const handlePasswordChange = (event) => {
    const newPassword = event.target.value;
    setPassword(newPassword);
    validatePasswordStrength(newPassword);
  };

  const validatePasswordsMatch = (password, repeatPassword) => {
    setRepeatPasswordError(
      password === repeatPassword ? "" : "Passwords do not match"
    );
  };

  const handleRepeatPasswordChange = (event) => {
    const newRepeatPassword = event.target.value;
    setRepeatPassword(newRepeatPassword);
    validatePasswordsMatch(password, newRepeatPassword);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("handle submit - " + username);
    if (username.length === 0) {
      setUserNameError("Please enter a username.");
      return;
    }
    if (!isUsernameValid(username)) {
      setUserNameError("Username should be at least 3 characters long.");
      return;
    }
    if (!isPasswordValid(password)) {
      setPasswordError("Password must meet the criteria.");
      return;
    }

    if (password !== repeatPassword) {
      setRepeatPasswordError("Passwords do not match");
      return;
    }

    // Perform registration logic
    console.log(
      "submitting - user name - " + username + " password - " + password
    );
  };
  const goBack = () => {
    navigate("/", { replace: true });
  };
  return (
    <div className="container">
      <div className="greeting">
        <Button label="<" onClick={goBack} className="backBtn" />
        <div>
          <h1 className="greetingTitle">
            Register as a trainer to the Hero company
          </h1>
          <h2 className="greetingDescription">
            Create an account and become a hero in our adventure
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
            <Input
              type="password"
              placeholder="Repeat Password"
              value={repeatPassword}
              onChange={handleRepeatPasswordChange}
              className="login-input"
            />
            {passwordError ? (
              <div className="error-message">{passwordError}</div>
            ) : repeatPasswordError ? (
              <div className="error-message">{repeatPasswordError}</div>
            ) : usernameError ? (
              <div className="error-message">{usernameError}</div>
            ) : (
              <></>
            )}
            <Button
              type="submit"
              label="Register"
              onClick={handleSubmit}
              className="button"
              disabled={passwordError || repeatPasswordError}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

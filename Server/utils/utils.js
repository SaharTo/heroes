require("dotenv").config();

const bcrypt = require("bcrypt");

const isPasswordValid = (password) => {
  const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#?$%^&*()]).{8,}$/;
  console.log("isPasswordValid - " + regex.test(password));

  return regex.test(password);
};
const isUsernameValid = (username) => {
  return username.length >= 3;
};
const isEmailValid = (email) => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  console.log("isEmailValid - " + regex.test(email));
  return regex.test(email);
};

const hashPassword = async (plainPassword) => {
  const saltRounds = 10;
  try {
    const hash = await bcrypt.hash(plainPassword, saltRounds);
    return hash;
  } catch (error) {
    throw error;
  }
};

const comparePasswords = async (inputPassword, hashedPassword) => {
  try {
    const result = await bcrypt.compare(inputPassword, hashedPassword);
    return result;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  isPasswordValid,
  isUsernameValid,
  isEmailValid,
  hashPassword,
  comparePasswords,
};

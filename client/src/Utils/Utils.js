export const isPasswordValid = (password) => {
  const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#?$%^&*()]).{8,}$/;
  return regex.test(password);
};
export const isUsernameValid = (username) => {
  return username.length >= 3;
};

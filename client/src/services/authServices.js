import axios from "axios";

export const signupService = async (userData) => {
  const { username, password } = userData;

  const response = await axios.post("http://localhost:3000/auth/signup", {
    username,
    password,
  });
  return response;
};

export const loginService = async (userData) => {
  const { username, password } = userData;
  const response = await axios.post("http://localhost:3000/auth/login", {
    username,
    password,
  });
  return response;
};

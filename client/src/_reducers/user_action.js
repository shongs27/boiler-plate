import axios from "axios";
import { LOGIN_USER, REGISTER_USER, AUTH_USER } from "../_actions/types";

export function loginUser(dataToSubmit) {
  const request = axios.post("/api/users/login", dataToSubmit).then((res) => {
    return res.data;
  });

  return {
    type: LOGIN_USER,
    payload: request,
  };
}

export function registerUser(dataToSubmit) {
  const request = axios
    .post("/api/users/register", dataToSubmit)
    .then((res) => {
      return res.data;
    });

  return {
    type: REGISTER_USER,
    payload: request, //success: true
  };
}

export function auth() {
  const request = axios.get("/api/users/auth").then((res) => {
    return res.data;
  });

  return {
    type: AUTH_USER,
    payload: request,
  };
}

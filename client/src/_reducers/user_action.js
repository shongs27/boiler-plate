import axios from "axios";
import { LOGIN_USER, REGISTER_USER } from "../_actions/types";

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

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../../_reducers/user_action";

const LoginPage = (props) => {
  const dispatch = useDispatch();

  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  const onEmail = (e) => {
    setEmail(e.target.value);
  };

  const onPassword = (e) => {
    setPassword(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    let body = {
      email: Email,
      password: Password,
    };

    dispatch(loginUser(body)).then((res) => {
      if (res.payload.loginSuccess) {
        props.history.push("/");
      } else {
        alert("Error");
      }
    });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={onSubmit}
      >
        <label>Email</label>
        <input type="Email" value={Email} onChange={onEmail} />
        <label>Password</label>
        <input type="Password" value={Password} onChange={onPassword} />
        <br />
        <button>Login</button>
      </form>
    </div>
  );
};

export default LoginPage;

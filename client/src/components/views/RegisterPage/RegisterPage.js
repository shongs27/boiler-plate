import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../../../_reducers/user_action";

const RegisterPage = (props) => {
  const dispatch = useDispatch();

  const [Email, setEmail] = useState("");
  const [Name, setName] = useState("");
  const [Password, setPassword] = useState("");
  const [Password2, setPassword2] = useState("");

  const onEmail = (e) => {
    setEmail(e.target.value);
  };

  const onName = (e) => {
    setName(e.target.value);
  };

  const onPassword = (e) => {
    setPassword(e.target.value);
  };

  const onPassword2 = (e) => {
    setPassword2(e.target.value);
  };

  const onRegister = (e) => {
    e.preventDefault();

    if (Password !== Password2) {
      return alert("비밀번호와 비밀번호 확인은 같아야 합니다");
    }

    let body = {
      email: Email,
      name: Name,
      password: Password,
    };

    dispatch(registerUser(body)).then((res) => {
      if (res.payload.success) {
        props.history.push("/login");
      } else {
        alert("Fail to Sign up");
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
        onSubmit={onRegister}
      >
        <label>Email</label>
        <input type="email" value={Email} onChange={onEmail} />
        <label>Name</label>
        <input type="text" value={Name} onChange={onName} />
        <label>Password</label>
        <input type="password" value={Password} onChange={onPassword} />
        <label>Confirm Password</label>
        <input type="password" value={Password2} onChange={onPassword2} />
        <br />
        <button>Register</button>
      </form>
    </div>
  );
};

export default RegisterPage;

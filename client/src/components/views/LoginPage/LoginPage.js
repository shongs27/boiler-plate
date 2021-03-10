import React, { useState } from "react";

const LoginPage = () => {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  const onEmail = (e) => {
    setEmail(e.target.value);
  };

  const onPassword = (e) => {
    setPassword(e.target.value);
  };

  const onSubmit = () => {};

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

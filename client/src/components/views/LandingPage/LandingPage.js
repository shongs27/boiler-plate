import React, { useEffect } from "react";
import axios from "axios";
import { PromiseProvider } from "mongoose";

const LandingPage = (props) => {
  useEffect(() => {
    axios.get("/api/hello").then((res) => console.log(res));
  }, []);

  const offLogout = () => {
    axios.get("/api/users/logout").then((res) => {
      if (res.data.success) {
        props.history.push("/login");
      } else {
        alert("로그아웃하는데 실패했습니다");
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
      <h2>시작 페이지</h2>

      <br />
      <button onClick={offLogout}>로그아웃</button>
    </div>
  );
};

export default LandingPage;

import React from "react";
import BottomNav from "../components/BottomNav";
import NavBar from "../components/NavBar";
import Login from "../components/user/Login";

function Home() {
  return (
    <>
      <Login />
      <NavBar />
      <BottomNav />
    </>
  );
}

export default Home;

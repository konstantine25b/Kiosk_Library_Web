import React from "react";
import HomePage from "./Pages/HomePage";
import { Outlet } from "react-router-dom";
import Navbar from "./Pages/NavBar";

export default function Root() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

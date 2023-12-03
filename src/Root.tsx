import React from "react";
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

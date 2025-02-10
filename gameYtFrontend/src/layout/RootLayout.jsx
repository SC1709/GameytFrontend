import React from "react";
import Navbar from "../components/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import Design from "../components/BackgroundDesign/Background";

function RootLayout() {
  return (
    <>
      <main className="bg-neutral-50 font-Inter bg-transparent">
        <Design style={{ zIndex: -50 }} />
        <Navbar />
        <div className="">
          <Outlet />
        </div>
      </main>
    </>
  );
}

export default RootLayout;

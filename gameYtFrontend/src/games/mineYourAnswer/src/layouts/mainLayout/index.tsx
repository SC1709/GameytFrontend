import React from "react";
import { Outlet } from "react-router-dom";
import backgroundImg from "../../assets/iPhone 16 - 4.png";

export const MainLayout = () => {
  return (
    <main
      style={{
        backgroundImage: `URL(${backgroundImg})`,
        backgroundSize: "contain",
        height: "100%",
        width: "400px",
        position: "absolute",
        top: "50%",
        left : "50%",
        transform : "translate(-50%, -50%)",
        overflow: "hidden"
      }}
    >
      <section className="game w-[400px] ">
        <Outlet />
      </section>
    </main>
  );
};

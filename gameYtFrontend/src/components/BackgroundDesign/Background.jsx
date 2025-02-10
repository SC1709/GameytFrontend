import React from "react";

function Design() {
  return (
    <>
      <div className="fixed h-[100%] w-full bg-[rgb(238,231,222)]" style={{ zIndex: -50 }}>
        <div
          className="absolute w-16 h-16 bg-[#d8d1c7] opacity-75 rotate-12 z-10"
          style={{ top: "5%", left: "10%", zIndex: -50 }} // z-index to show below
        ></div>
        <div className="absolute w-16 h-16 bg-[#d8d1c7] opacity-75 rotate-6" style={{ top: "14%", right: "10%", zIndex: -50 }}></div>
        <div className="absolute w-16 h-16 bg-[#d8d1c7] opacity-75 rotate-12" style={{ bottom: "15%", left: "30%", zIndex: -50 }}></div>
        <div
          className="absolute w-16 h-16 bg-[#d8d1c7] opacity-75 rotate-45"
          style={{ bottom: "20%", right: "2%", zIndex: -50 }} //right -2 to 2 overflow
        ></div>
        <div className="absolute w-16 h-16 bg-[#d8d1c7] opacity-75 rotate-6" style={{ bottom: "1%", left: "-9%", zIndex: -50 }}></div>
      </div>
    </>
  );
}

export default Design;

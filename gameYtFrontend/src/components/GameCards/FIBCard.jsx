import { Heart, LockIcon } from "lucide-react";
import { Link } from "react-router-dom";
import List from "../../assets/list.png";
import Chain from "../../assets/chain.webp";

export const FIBCard = () => {
  return (
    // <Link to={"/questions/play"}>
    //   <div
    //     style={{
    //       zIndex: "2",
    //       overflow: "hidden",
    //     }}
    //   >
    <div
      style={{
        zIndex: "2",
        overflow: "hidden",
        pointerEvents: "none", // Disable click events
      }}
    >
      <div
        className="absolute  h-full w-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center"
        style={{
          zIndex: 1,
          backdropFilter: "blur(0.4px)",
          // backgroundImage: `url(${Chain})`,
        }}
      >
        <LockIcon size={"100px"} />
        <p className="font-bold text-xl text-white bg-black rounded-3xl p-3 mt-2">Coming Soon...</p>
      </div>
      <div className={`h-[25.375rem] w-[21.875rem] bg-[rgb(70,121,102)] rounded-3xl cursor-pointer`}>
        <div className="p-5 pt-[1.563rem]">
          <div className="flex justify-between ">
            <div className="h-[3.063rem] w-[7.25rem] text-white text-[1.25rem] rounded-full bg-black flex items-center justify-center">FIB</div>
            <div className="h-[3.348rem] w-[3.348rem] bg-white rounded-full justify-center items-center flex">
              <Heart className="text-red-600" />
            </div>
          </div>
          <div className="px-3 ">
            <h2 className="text-[2.5rem] font-[500] leading-[3.125rem] mt-2">FIB</h2>
            <p className="font-[300] mt-2 text-[1.3rem] leading-[1.688rem] w-[15.938rem] h-[7.625rem] tracking-[5%] text-white">
              Test your knowledge with engaging Fill in the blanks.
            </p>
          </div>
        </div>
        <div className="relative">
          <img src={List} alt="list" className="h-[9.875rem] w-[16.875rem] -mt-14" />
        </div>
      </div>
    </div>
    // </Link>
  );
};

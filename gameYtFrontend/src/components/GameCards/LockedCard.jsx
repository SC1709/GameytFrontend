import { LockIcon } from "lucide-react";
// import Chain from "../../assets/chain.webp";
import { UnlockedCard } from "./UnlockedCard";

export const LockedCard = ({type, tag, description, imgSrc, linkTo , bg="orange"}) => {
  return (
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
        <p className="font-bold text-xl text-white bg-black rounded-3xl p-3 mt-2">
          Coming Soon...
        </p>
      </div>
      <UnlockedCard type={type} bg={bg} tag={tag} description={description} imgSrc={imgSrc} linkTo={linkTo}/>
      </div>
      );
};

import React, { useState } from "react";
import { Heart } from "lucide-react";

export const UnlockedCard = ({ type, tag, description, imgSrc, bg, liked = false, onLike = () => {}, className = "" }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div
      className={`group relative flex flex-col overflow-hidden rounded-3xl transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg
        h-[25.375rem] w-[21rem] ${className}`}
      style={{
        backgroundColor: bg,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Content Container */}
      <div className="p-5 pt-[1.563rem] text-center relative">
        {/* Header */}
        <div className="flex justify-between">
          {/* Tag */}
          <div className="h-[2.5rem] w-[5.5rem] text-[1.25rem] rounded-2xl bg-black flex items-center justify-center">
            <span className="text-white">{tag}</span>
          </div>

          {/* Like Button */}
          <span
            onClick={(e) => {
              e.stopPropagation();
              onLike(!liked);
            }}
            className={`h-[3.348rem] w-[3.348rem] bg-white rounded-2xl flex items-center justify-center
              transition-all duration-300 hover:bg-red-200
              ${isHovered ? "shadow-md" : "shadow-sm"}`}
            aria-label={liked ? "Unlike" : "Like"}
          >
            <Heart
              className={`transition-all duration-300
                ${liked ? "fill-red-500 text-red-500" : "text-red-600"}`}
            />
          </span>
        </div>

        {/* Content */}
        <div className="question-description-container px-3">
          <h2 className="text-[2rem] font-[500] leading-[3.125rem] mt-2">{type}</h2>
          <p className="font-[300] text-[1.2rem] leading-[1.688rem] w-[15.938rem] h-[7.625rem] tracking-[5%] text-white">{description}</p>
        </div>
      </div>

      {/* Image Container */}
      <div className="absolute bottom-0 left-0 right-0 h-[9.875rem] w-full overflow-hidden flex justify-center items-center mb-[1.25rem]">
        {/* Loading Skeleton */}
        {!imageLoaded && <div className="absolute inset-0 animate-pulse bg-black/10" />}

        <img
          src={imgSrc}
          alt={`${type} illustration`}
          className={`h-full w-full object-contain transition-opacity duration-300
            ${imageLoaded ? "opacity-100" : "opacity-0"}`}
          onLoad={() => setImageLoaded(true)}
        />
      </div>
    </div>
  );
};

export default UnlockedCard;

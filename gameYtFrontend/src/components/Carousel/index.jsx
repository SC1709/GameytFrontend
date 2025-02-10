import React, { useState, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const Carousel = ({ children, autoPlay = false, autoPlayInterval = 3000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % children.length);
  }, [children.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + children.length) % children.length);
  }, [children.length]);

  const goToSlide = useCallback((index) => {
    setCurrentIndex(index);
  }, []);

  // Auto-play functionality
  React.useEffect(() => {
    if (!autoPlay || isHovered) return;

    const interval = setInterval(nextSlide, autoPlayInterval);
    return () => clearInterval(interval);
  }, [autoPlay, isHovered, nextSlide, autoPlayInterval]);

  return (
    <div className="flex flex-col items-center w-full max-w-3xl mx-auto" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <div className="relative w-full overflow-hidden">
        <div className="carousel w-full h-96 flex items-center justify-center relative my-10">
          {React.Children.map(children, (child, index) => {
            const offset = index - currentIndex;
            const adjustedOffset =
              offset < -Math.floor(children.length / 2) ? offset + children.length : offset > Math.floor(children.length / 2) ? offset - children.length : offset;

            const isMainCard = adjustedOffset === 0;
            const isSecondCard = Math.abs(adjustedOffset) === 1;
            const isThirdCard = Math.abs(adjustedOffset) === 2;

            // Enhanced scaling and opacity logic
            let scale = 0.95;
            let opacity = 1;
            let zIndex = 30 - Math.abs(adjustedOffset);
            let translateY = 0;

            if (isSecondCard) {
              scale = 0.8;
              opacity = 0.6;
              translateY = 5;
            } else if (isThirdCard) {
              scale = 0.7;
              opacity = 0.34;
              translateY = 10;
            } else if (!isMainCard) {
              scale = 0.6;
              opacity = 0.3;
              translateY = 15;
            }

            return (
              <div
                className="absolute transition-all duration-500 ease-in-out mx-3 py-4 cursor-pointer"
                style={{
                  zIndex,
                  transform: `translateX(${adjustedOffset * 50}%) translateY(${translateY}px) scale(${scale})`,
                  opacity: isMainCard ? 1 : opacity, // Ensure main card is always fully opaque
                  filter: `blur(${isMainCard ? 0 : 2}px)`,
                  pointerEvents: isMainCard ? "auto" : "none",
                }}
                onClick={() => isMainCard && goToSlide(index)}
                role="button"
                tabIndex={isMainCard ? 0 : -1}
                aria-label={`Slide ${index + 1}`}
              >
                {child}
              </div>
            );
          })}
        </div>
      </div>

      {/* Enhanced Navigation Controls */}
      <div className="flex items-center justify-center gap-4 mb-2">
        <button
          onClick={prevSlide}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <div className="flex gap-2">
          {React.Children.map(children, (_, index) => (
            <button
              onClick={() => goToSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                currentIndex === index ? "bg-blue-600 w-6" : "bg-gray-300 w-2 hover:bg-gray-400"
              }`}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={currentIndex === index ? "true" : "false"}
            />
          ))}
        </div>

        <button onClick={nextSlide} className="p-2 rounded-full hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500" aria-label="Next slide">
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default Carousel;

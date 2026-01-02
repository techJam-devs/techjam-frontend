/**
 * @description Reusable Auth Carousel
 */
import { useState, useEffect } from "react";
import type React from "react";

interface Slide {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}

interface CarouselProps {
  slides: Slide[];
  interval?: number;
}

const AuthCarousel: React.FC<CarouselProps> = ({ slides, interval = 4000 }) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, interval);

    return () => clearInterval(timer);
  }, [slides.length, interval]);

  const { icon, title, subtitle } = slides[current];

  return (
    <div className="flex flex-col items-center justify-center text-center space-y-4 p-4 w-full">
      <div className="text-blue">{icon}</div>
      <h2 className="font-bold text-xl text-gray-100">{title}</h2>
      <p className="text-xs text-gray-100 max-w-sm">{subtitle}</p>

      {/* Dots indicator */}
      <div className="flex justify-center mt-6 gap-2">
        {slides.map((_, idx) => (
          <div
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`w-2.5 h-2.5 rounded-full cursor-pointer transition-all ${
              idx === current ? "bg-blue-500 scale-110" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default AuthCarousel;

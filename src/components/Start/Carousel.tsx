import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import "../../styles/Carrusel.css"; // Ya lo tienes así

interface Slide {
  image: string;
  title: string;
  subtitle: string;
}

interface CarouselProps {
  slides: Slide[];
}

const Carousel: React.FC<CarouselProps> = ({ slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const nextSlide = useCallback(() => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
      setIsAnimating(false);
    }, 500);
    resetTimer();
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? slides.length - 1 : prevIndex - 1
      );
      setIsAnimating(false);
    }, 500);
    resetTimer();
  }, [slides.length]);

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(nextSlide, 3000);
  }, [nextSlide]);

  useEffect(() => {
    timerRef.current = setTimeout(nextSlide, 3000);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [currentIndex, nextSlide]);

  return (
    <div className="sliderContainer">
      <button className="prev" onClick={prevSlide}>❮</button>

      <div className={`sliderImage ${isAnimating ? "fade" : ""}`}>
        <Image
          src={slides[currentIndex].image}
          alt="slider"
          width={1400}
          height={500}
          layout="responsive"
          priority
        />
        <div className="textOverlay">
          <h1>{slides[currentIndex].title}</h1>
          <h2>{slides[currentIndex].subtitle}</h2>
        </div>
      </div>

      <button className="next" onClick={nextSlide}>❯</button>
    </div>
  );
};

export default Carousel;

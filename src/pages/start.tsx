import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Navbar from "../components/Navbar";
import styles from "../styles/Start.module.css";

const slides = [
  {
    image: "/img/Carrusel1.png",
    title: "HARDSAN",
    subtitle: "Un eslogan",
  },
  {
    image: "/img/Carrusel2.png",
    title: "Herramientas de Calidad",
    subtitle: "Lo mejor para tu trabajo",
  },
  {
    image: "/img/Carrusel3.png",
    title: "Soluciones Profesionales",
    subtitle: "Confianza y durabilidad",
  },
];

const Start: React.FC = () => {
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
  }, []);

  const prevSlide = useCallback(() => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? slides.length - 1 : prevIndex - 1
      );
      setIsAnimating(false);
    }, 500);
    resetTimer();
  }, []);

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
    <div>
      <Navbar />
      <div className={styles.content}>
        <div className={styles.sliderContainer}>
          <button className={styles.prev} onClick={prevSlide}>❮</button>

          <div className={`${styles.sliderImage} ${isAnimating ? styles.fade : ""}`}>
            <Image
              src={slides[currentIndex].image}
              alt="slider"
              width={1400}
              height={500}
              layout="responsive"
              priority
            />
            <div className={styles.textOverlay}>
              <h1>{slides[currentIndex].title}</h1>
              <h2>{slides[currentIndex].subtitle}</h2>
            </div>
          </div>

          <button className={styles.next} onClick={nextSlide}>❯</button>
        </div>
      </div>
    </div>
  );
};

export default Start;

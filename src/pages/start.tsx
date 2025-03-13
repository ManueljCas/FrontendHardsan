import React from "react";
import Navbar from "../components/Navbar";
import Carousel from "../components/Start/Carousel";
import NewProducts from "../components/Start/NewProducts";
import Categories from "../components/Start/Categories";
import BestSellingProduct from "@/components/Start/BestSellingProducts";
import Footer from "@/components/Footer";

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
  return (
    <div>
      <Navbar />
      <div className="content">
        <Carousel slides={slides} />
        <NewProducts />
        <Categories />
        <BestSellingProduct />
      </div>
      <Footer />
    </div>
  );
};

export default Start;

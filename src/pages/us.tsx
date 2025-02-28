import React, { useState, useEffect } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import "@/styles/Us.css";
import Footer from "../components/Footer";

const values = [
  { name: "Compromiso", img: "/img/compromiso.png" },
  { name: "Honestidad", img: "/img/honestidad.png" },
  { name: "Trabajo en equipo", img: "/img/trabajo.png" },
  { name: "Excelencia", img: "/img/excelencia.png" },
  { name: "Comunicación Efectiva", img: "/img/comunicacion.png" },
  { name: "Innovación", img: "/img/innovacion.png" },
  { name: "Sistemas", img: "/img/sistemas.png" },
  { name: "Responsabilidad Social", img: "/img/responsabilidad.png" },
];

const providers = [
  { name: "Hardsan", img: "/img/hardsan.png" },
  { name: "Phillips", img: "/img/phillips.png" },
  { name: "Yale", img: "/img/yale.png" },
  { name: "Tesa", img: "/img/tesa.png" },
  { name: "Hettich", img: "/img/hettich.png" },
  { name: "Herrajes", img: "/img/herrajes.png" },
];

const Us: React.FC = () => {
  const [startIndex, setStartIndex] = useState(0);
  const [providerIndex, setProviderIndex] = useState(0);
  const visibleItems = 4;
  const visibleProviders = 6;

  useEffect(() => {
    const interval = setInterval(() => {
      setProviderIndex((prev) => (prev + 1) % providers.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const getVisibleProviders = () => {
    const duplicatedProviders = [...providers, ...providers];
    return duplicatedProviders.slice(providerIndex, providerIndex + visibleProviders);
  };

  return (
    <>
      <Navbar />
      <div className="us-container">
        <div className="us-header">
          <Image
            src="/img/Us.png"
            alt="Hardsan Team"
            className="us-header-img"
            width={1200}
            height={400}
            objectFit="cover"
          />
          <h1 className="us-slogan">Eslógan</h1>
        </div>

        <div className="us-cards-container">
          <div className="us-card">
            <h2 className="us-card-title">Quiénes Somos</h2>
            <p className="us-card-text">
              Somos un gran equipo de trabajadores comprometidos con nuestros colaboradores,
              proveedores y clientes. Actualmente contamos con 6 sucursales en Cancún, Playa
              del Carmen, Mérida y Villahermosa, además de un CEDIS para distribución nacional.
            </p>
          </div>
          <div className="us-card">
            <h2 className="us-card-title">Misión</h2>
            <p className="us-card-text">
              Somos una empresa vanguardista que provee soluciones de seguridad y distribución
              de herrajes de la más alta calidad, innovando en productos y ofreciendo soporte
              técnico con excelencia en servicio.
            </p>
          </div>
          <div className="us-card">
            <h2 className="us-card-title">Visión</h2>
            <p className="us-card-text">
              Consolidarnos como un referente en distribución y comercialización de herrajes a nivel
              nacional e internacional, destacando por calidad, seguridad e innovación.
            </p>
          </div>
        </div>

        <div className="us-values-container">
          <button
            className="us-arrow"
            onClick={() =>
              setStartIndex((prev) => (prev > 0 ? prev - 1 : values.length - visibleItems))
            }
          >
            &lt;
          </button>
          <div className="us-values">
            {values.slice(startIndex, startIndex + visibleItems).map((value, index) => (
              <div key={index} className="us-value-card">
                <p>{value.name}</p>
                <Image src={value.img} alt={value.name} width={100} height={100} />
              </div>
            ))}
          </div>
          <button
            className="us-arrow"
            onClick={() => setStartIndex((prev) => (prev + 1) % values.length)}
          >
            &gt;
          </button>
        </div>

        <div className="us-providers-container">
          <h2 className="us-providers-title">Nuestros Proveedores</h2>
          <div className="us-providers">
            {getVisibleProviders().map((provider, index) => (
              <div key={index} className="us-provider-card">
                <Image src={provider.img} alt={provider.name} width={150} height={50} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Us;

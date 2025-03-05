import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useAuth } from "../context/AuthContext";
import "../styles/Navbar.css";

const Navbar: React.FC = () => {
  const { user } = useAuth();
  const [isHidden, setIsHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100 && window.scrollY > lastScrollY) {
        setIsHidden(true); // Oculta el navbar cuando baja más de 100px
      } else if (window.scrollY <= 90) {
        setIsHidden(false); // Solo eaparece si sube hasta los primeros 100px
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <header className={`navbar ${isHidden ? "hidden" : ""}`}>
      <div className="navbar__top"></div>

      <div className="navbar__bottom">
        <div className="navbar__container">
          <div className="navbar__logo">
            <Image
              src="/img/HardsanLogo.png"
              alt="Hardsan Logo"
              width={120}
              height={50}
              className="navbar__logo-image"
            />
          </div>

          <nav className="navbar__nav">
            <a href="start" className="navbar__nav-link">Inicio</a>
            <a href="products" className="navbar__nav-link">Productos</a>
            <a href="us" className="navbar__nav-link">Nosotros</a>
            <a href="#contactanos" className="navbar__nav-link">Contáctanos</a>
          </nav>

          <div className="navbar__actions">
            <div className="navbar__search-container">
              <input
                type="text"
                placeholder="Buscar productos..."
                className="navbar__search"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="navbar__search-icon"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </div>

            {user ? (
              <>
                <a href="cart" className="navbar__action-link">Carrito</a>
                <span className="navbar__divider"></span>
                <a href="configuration" className="navbar__action-link">Configuración</a>
              </>
            ) : (
              <>
                <a href="login" className="navbar__action-link">Iniciar sesión</a>
                <span className="navbar__divider"></span>
                <a href="register" className="navbar__action-link">Registrarse</a>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "../context/AuthContext";
import "../styles/Footer.css";

const Footer: React.FC = () => {
  const { user } = useAuth(); 

  return (
    <footer className="footer">
      <div className="footer__logo">
        <Image
          src="/img/HardsanLogo.png"
          alt="Hardsan Logo"
          width={180}
          height={60}
        />
      </div>

      <div className="footer__social">
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
          <img src="https://cdn-icons-png.flaticon.com/512/174/174855.png" alt="Instagram" className="footer__icon" />
        </a>
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
          <img src="https://cdn-icons-png.flaticon.com/512/733/733547.png" alt="Facebook" className="footer__icon" />
        </a>
        <a href="https://wa.me/123456789" target="_blank" rel="noopener noreferrer">
          <img src="https://cdn-icons-png.flaticon.com/512/733/733585.png" alt="WhatsApp" className="footer__icon" />
        </a>
        <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer">
          <img src="https://cdn-icons-png.flaticon.com/512/3046/3046122.png" alt="TikTok" className="footer__icon" />
        </a>
        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
          <img src="https://cdn-icons-png.flaticon.com/512/1384/1384060.png" alt="YouTube" className="footer__icon" />
        </a>
      </div>

      <nav className="footer__nav">
        <Link href="/start">Inicio</Link>
        <Link href="/products">Productos</Link>
        <Link href="/us">Nosotros</Link>
        <Link href="/contact">Contáctanos</Link>

        {user ? (
          <>
            <Link href="/configuration">Configuración</Link>
          </>
        ) : (
          <>
            <Link href="/login">Iniciar sesión</Link>
            <Link href="/register">Registrarse</Link>
          </>
        )}
      </nav>

      <div className="footer__copyright">
        <p>Todos los derechos reservados para Hardsan ©2025</p>
      </div>
    </footer>
  );
};

export default Footer;

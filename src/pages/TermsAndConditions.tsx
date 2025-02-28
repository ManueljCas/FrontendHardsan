import React, { useState } from "react";
import Navbar from "../components/Navbar"; 
import "../styles/TermsAndConditions.css";
import Footer from "../components/Footer";

const TermsAndConditions: React.FC = () => {
  const [openSection, setOpenSection] = useState<number | null>(null);

  const toggleSection = (index: number) => {
    setOpenSection(openSection === index ? null : index);
  };

  return (
    <>
      <Navbar />

      <div className="terms-container">
        <h1 className="terms-title">TÉRMINOS Y CONDICIONES</h1>

        <div className="terms-content">
          <div className={`terms-section ${openSection === 1 ? "open" : ""}`} onClick={() => toggleSection(1)}>
            <button>
              <span>I. Introducción</span>
              <span className="toggle-icon">{openSection === 1 ? "∧" : "∨"}</span>
            </button>
            <div className="terms-text-container">
              <div className="terms-text">
                Bienvenido a Hardsan. Estos términos y condiciones regulan el uso de nuestra plataforma de comercio electrónico. 
                Al acceder y utilizar nuestros servicios, aceptas cumplir con los términos aquí establecidos.
              </div>
            </div>
          </div>

          <div className={`terms-section ${openSection === 2 ? "open" : ""}`} onClick={() => toggleSection(2)}>
            <button>
              <span>II. Definiciones</span>
              <span className="toggle-icon">{openSection === 2 ? "∧" : "∨"}</span>
            </button>
            <div className="terms-text-container">
              <div className="terms-text">
                <p><strong>a)</strong> <strong>Usuario:</strong> Cualquier persona que acceda o utilice la plataforma.</p>
                <p><strong>b)</strong> <strong>Cliente:</strong> Persona que realiza una compra a través de la Tienda.</p>
                <p><strong>c)</strong> <strong>Productos:</strong> Bienes físicos, digitales o servicios ofrecidos en la Tienda.</p>
                <p><strong>d)</strong> <strong>La Tienda:</strong> Plataforma operada por Hardsan.</p>
              </div>
            </div>
          </div>

          <div className={`terms-section ${openSection === 3 ? "open" : ""}`} onClick={() => toggleSection(3)}>
            <button>
              <span>III. Registro y Cuenta de Usuario</span>
              <span className="toggle-icon">{openSection === 3 ? "∧" : "∨"}</span>
            </button>
            <div className="terms-text-container">
              <div className="terms-text">
                <p>Para acceder a ciertos servicios, es necesario crear una cuenta con información válida. El usuario es 
                  responsable de mantener la confidencialidad de sus credenciales y de todas las actividades realizadas en su cuenta.</p>
              </div>
            </div>
          </div>

          <div className={`terms-section ${openSection === 4 ? "open" : ""}`} onClick={() => toggleSection(4)}>
            <button>
              <span>IV. Productos y Precios</span>
              <span className="toggle-icon">{openSection === 4 ? "∧" : "∨"}</span>
            </button>
            <div className="terms-text-container">
              <div className="terms-text">
                <p>Los precios y descripciones de los productos están sujetos a cambios sin previo aviso. Nos reservamos el derecho 
                  de modificar o descontinuar cualquier producto sin notificación previa.</p>
              </div>
            </div>
          </div>

          <div className={`terms-section ${openSection === 5 ? "open" : ""}`} onClick={() => toggleSection(5)}>
            <button>
              <span>V. Métodos de Pago</span>
              <span className="toggle-icon">{openSection === 5 ? "∧" : "∨"}</span>
            </button>
            <div className="terms-text-container">
              <div className="terms-text">
                <p>Aceptamos pagos a través de tarjetas de crédito/débito, transferencias bancarias y otros métodos especificados en 
                  la plataforma. Los pagos están sujetos a verificación y autorización.</p>
              </div>
            </div>
          </div>

          <div className={`terms-section ${openSection === 6 ? "open" : ""}`} onClick={() => toggleSection(6)}>
            <button>
              <span>VI. Envíos y Entrega</span>
              <span className="toggle-icon">{openSection === 6 ? "∧" : "∨"}</span>
            </button>
            <div className="terms-text-container">
              <div className="terms-text">
                <p>Realizamos envíos a nivel nacional. Los tiempos de entrega pueden variar según la ubicación y la disponibilidad 
                  del producto. No nos hacemos responsables por retrasos ocasionados por terceros.</p>
              </div>
            </div>
          </div>

          <div className={`terms-section ${openSection === 7 ? "open" : ""}`} onClick={() => toggleSection(7)}>
            <button>
              <span>VII. Devoluciones y Reembolsos</span>
              <span className="toggle-icon">{openSection === 7 ? "∧" : "∨"}</span>
            </button>
            <div className="terms-text-container">
              <div className="terms-text">
                <p>Los clientes pueden solicitar devoluciones dentro de los primeros 15 días tras la compra, siempre y cuando 
                  el producto esté en perfectas condiciones y en su empaque original. No se aceptarán devoluciones de productos 
                  usados o dañados.</p>
              </div>
            </div>
          </div>

          <div className={`terms-section ${openSection === 8 ? "open" : ""}`} onClick={() => toggleSection(8)}>
            <button>
              <span>VIII. Propiedad Intelectual</span>
              <span className="toggle-icon">{openSection === 8 ? "∧" : "∨"}</span>
            </button>
            <div className="terms-text-container">
              <div className="terms-text">
                <p>Todos los derechos de propiedad intelectual sobre la plataforma, incluyendo logotipos, textos, imágenes y código, 
                  pertenecen a Hardsan y están protegidos por las leyes de propiedad intelectual.</p>
              </div>
            </div>
          </div>

          <div className={`terms-section ${openSection === 9 ? "open" : ""}`} onClick={() => toggleSection(9)}>
            <button>
              <span>IX. Contacto</span>
              <span className="toggle-icon">{openSection === 9 ? "∧" : "∨"}</span>
            </button>
            <div className="terms-text-container">
              <div className="terms-text">
                <p>Para cualquier duda o aclaración, puedes contactarnos a través de nuestro correo electrónico: soporte@hardsan.com.</p>
              </div>
            </div>
          </div>

        </div>
      </div>
      <Footer />
    </>
  );
};

export default TermsAndConditions;

import React, { useState } from "react";
import Navbar from "../components/Navbar"; // Llamamos el header de la app
import "../styles/TermsAndConditions.css";

const TermsAndConditions: React.FC = () => {
  const [openSection, setOpenSection] = useState<number | null>(null);

  const toggleSection = (index: number) => {
    setOpenSection(openSection === index ? null : index);
  };

  return (
    <>
      {/* Navbar de la aplicación */}
      <Navbar />

      {/* Contenedor principal */}
      <div className="terms-container">
        <h1 className="terms-title">Términos y condiciones</h1>

        {/* Secciones del acuerdo */}
        <div className="terms-content">
          {/* Sección 1 */}
          <div className={`terms-section ${openSection === 1 ? "open" : ""}`} onClick={() => toggleSection(1)}>
            <button>
              <span>I. Introducción</span>
              <span className="toggle-icon">{openSection === 1 ? "∧" : "∨"}</span>
            </button>
            <div className="terms-text-container">
              <div className="terms-text">
                Esta sección introduce los términos y condiciones de uso de la plataforma.
              </div>
            </div>
          </div>

          {/* Sección 2 */}
          <div className={`terms-section ${openSection === 2 ? "open" : ""}`} onClick={() => toggleSection(2)}>
            <button>
              <span>II. Definiciones</span>
              <span className="toggle-icon">{openSection === 2 ? "∧" : "∨"}</span>
            </button>
            <div className="terms-text-container">
              <div className="terms-text">
                <p><strong>a)</strong> Usuario: Cualquier persona que acceda o utilice la plataforma.</p>
                <p><strong>b)</strong> Cliente: Persona que realiza una compra a través de la Tienda.</p>
                <p><strong>c)</strong> Productos: Bienes físicos, digitales o servicios ofrecidos en la Tienda.</p>
                <p><strong>d)</strong> La Tienda: Plataforma operada por Hardsan.</p>
              </div>
            </div>
          </div>

          {/* Sección 3 */}
          <div className={`terms-section ${openSection === 3 ? "open" : ""}`} onClick={() => toggleSection(3)}>
            <button>
              <span>III. Registro y Cuenta de Usuario</span>
              <span className="toggle-icon">{openSection === 3 ? "∧" : "∨"}</span>
            </button>
            <div className="terms-text-container">
              <div className="terms-text">
                <p>Para acceder a ciertos servicios, es necesario crear una cuenta con información válida.</p>
              </div>
            </div>
          </div>

          {/* Sección 4 */}
          <div className={`terms-section ${openSection === 4 ? "open" : ""}`} onClick={() => toggleSection(4)}>
            <button>
              <span>IV. Productos y Precios</span>
              <span className="toggle-icon">{openSection === 4 ? "∧" : "∨"}</span>
            </button>
            <div className="terms-text-container">
              <div className="terms-text">
                <p>Los precios y descripciones de los productos están sujetos a cambios sin previo aviso.</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </>
  );
};

export default TermsAndConditions;

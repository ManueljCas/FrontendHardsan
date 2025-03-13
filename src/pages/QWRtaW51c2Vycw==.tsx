import React from "react";
import NavbarAdmin from "../components/QWRtaW5Db25maWc=";
import "../styles/Adminuser.css";
import { useRouter } from "next/router";

const Adminuser: React.FC = () => {
  const router = useRouter();

  const handleBack = () => {
    router.push("YWRtaW4tdXNlcnM="); // ← ruta codificada a Usuarios
  };

  return (
    <div className="adminuser-layout">
      <NavbarAdmin />
      <div className="adminuser-content">
        <div className="adminuser-container">
          <div className="adminuser-section">
            <div className="adminuser-section-header">
              <button className="adminuser-back" onClick={handleBack}>
                ‹
              </button>
              <h2 className="adminuser-title">Datos personales</h2>
              <button className="adminuser-edit">Editar</button>
            </div>
            <div className="adminuser-card">
              <div className="adminuser-row">
                <span>Nombre completo:</span>
                <span>Manuel Jesús Castro Pech</span>
              </div>
              <div className="adminuser-row">
                <span>Fecha de nacimiento:</span>
                <span>17 - septiembre - 2003</span>
              </div>
              <div className="adminuser-row">
                <span>Número de teléfono:</span>
                <span>********74</span>
              </div>
            </div>
          </div>

          <div className="adminuser-section">
            <div className="adminuser-section-header center-title">
              <h2 className="adminuser-title">Datos usuario</h2>
              <button className="adminuser-edit">Editar</button>
            </div>
            <div className="adminuser-card">
              <div className="adminuser-row">
                <span>Correo electrónico:</span>
                <span>jesus.castro.pech@gmail.com</span>
              </div>
              <div className="adminuser-row">
                <span>Contraseña:</span>
                <span>********</span>
              </div>
              <div className="adminuser-row">
                <span>Estado:</span>
                <span className="adminuser-estado activo">Activo</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Adminuser;

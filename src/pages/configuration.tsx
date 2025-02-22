import React from "react";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext"; // Importar el contexto de autenticación
import { useRouter } from "next/router";
import "../styles/Configuration.css"; // Importamos los estilos

const Configuration: React.FC = () => {
  const { logout } = useAuth(); // Obtener la función de cierre de sesión
  const router = useRouter();

  const handleLogout = () => {
    const confirmLogout = window.confirm("¿Estás seguro de que deseas cerrar sesión?");
    if (confirmLogout) {
      logout(); // Llamar a la función logout del contexto
      router.push("/start"); // Redirigir a la página de login
    }
  };

  return (
    <>
      <Navbar />
      <div className="config-container">
        <div className="config-content">
          <h1 className="config-title">Configuración</h1>
          <ul className="config-list">
            <li className="config-item" onClick={() => router.push("/profile")}>
              Perfil <span>&gt;</span>
            </li>
            <li className="config-item" onClick={() => router.push("/orders")}>
              Pedidos <span className="notification">9</span> <span>&gt;</span>
            </li>
            <li className="config-item" onClick={() => router.push("/TermsAndConditions")}>
              Términos y condiciones <span>&gt;</span>
            </li>
            <li className="config-item" onClick={handleLogout}>
              Cerrar sesión <span>&gt;</span>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Configuration;

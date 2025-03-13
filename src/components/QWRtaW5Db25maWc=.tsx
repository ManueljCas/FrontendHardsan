import React, { useState } from "react";
import "@/styles/NavbarAdmin.css";
import { useRouter } from "next/router";
import { useAuth } from "@/context/AuthContext";

// Importar íconos
import IconDashboard from "../../public/img/IconDashboard.png";
import IconUsuarios from "../../public/img/IconUsuarios.png";
import IconPedidos from "../../public/img/IconPedidos.png";
import IconCerraresesion from "../../public/img/IconCerrarsesion.png";
import IconProductos from "../../public/img/IconProductos.png"
import logo from "../IMG/LogoHardsan.png";

const NavbarAdmin: React.FC = () => {
  const router = useRouter();
  const { logout } = useAuth();
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = () => {
    const confirmLogout = window.confirm("¿Estás seguro de que deseas cerrar sesión?");
    if (confirmLogout) {
      logout();
      router.push("/start");
    }
  };

  const toggleNavbar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className={`navbaradmin-container ${collapsed ? "collapsed" : ""}`}>
      <div className="navbaradmin-top">
        <div className="navbaradmin-toggle" onClick={toggleNavbar}>
          {collapsed ? "⮞" : "⮜"}
        </div>

        {!collapsed && (
          <div className="navbaradmin-logo-img">
            <img src={logo.src} alt="Logo Hardsan" />
          </div>
        )}

        {!collapsed && <div className="navbaradmin-menu-title">MENU</div>}

        <ul className="navbaradmin-menu">
          <li>
            <button onClick={() => router.push("/YWRtaW4tZGFzaGJvYXJk")}>
              {!collapsed && "Dashboard"}
              <img src={IconDashboard.src} alt="Dashboard" className="navbaradmin-icon" />
            </button>
          </li>
          <li>
            <button onClick={() => router.push("/YWRtaW4tdXNlcnM=")}>
              {!collapsed && "Usuarios"}
              <img src={IconUsuarios.src} alt="Usuarios" className="navbaradmin-icon" />
            </button>
          </li>
          <li>
            <button onClick={() => router.push("/QWRtaW51c2Vy")}>
              {!collapsed && "Pedidos"}
              <img src={IconPedidos.src} alt="Pedidos" className="navbaradmin-icon" />
            </button>
          </li>
          <li>
            <button onClick={() => router.push("/Adminproducts")}>
              {!collapsed && "Productos"}
              <img src={IconProductos.src} alt="Productos" className="navbaradmin-icon" />
            </button>
          </li>
        </ul>
      </div>

      <div className="navbaradmin-footer" onClick={handleLogout}>
        {!collapsed && "Cerrar sesión"}
        <img src={IconCerraresesion.src} alt="Cerrar sesión" className="navbaradmin-icon" />
      </div>
    </div>
  );
};

export default NavbarAdmin;

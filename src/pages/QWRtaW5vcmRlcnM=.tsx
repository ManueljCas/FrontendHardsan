import React from "react";
import NavbarAdmin from "../components/QWRtaW5Db25maWc=";
import "../styles/Adminorder.css";
import { useRouter } from "next/router";

const Adminorder: React.FC = () => {
  const router = useRouter();

  return (
    <div className="adminorder-layout">
      <NavbarAdmin />
      <div className="adminorder-content">
        <div className="adminorder-container">
          <div className="adminorder-header">
            <button className="adminorder-back" onClick={() => router.back()}>
              ‹
            </button>
            <h2 className="adminorder-title">Pedido #1</h2>
          </div>

          <div className="adminorder-info">
            <div className="adminorder-row">
              <span>Estado:</span>
              <span className="adminorder-status enproceso">En proceso</span>
            </div>
            <div className="adminorder-row">
              <span>Fecha y hora del pedido:</span>
              <span>27/01/2025 - 09:17:20</span>
            </div>
            <div className="adminorder-row">
              <span>Hora y fecha de entrega:</span>
              <span>N/A</span>
            </div>
            <div className="adminorder-row">
              <span>Nombre del establecimiento:</span>
              <span>HARDSAN | HC (CEDIS)</span>
            </div>
            <div className="adminorder-row">
              <span>Ubicación del establecimiento:</span>
              <span className="adminorder-direccion">
                Quintana Roo, Boulevard Luis Donaldo Colosio Mz. 8 Lote. 8 <br />
                Bodega G-9 Parque Logístico APQ, 77569 Cancún, Q.R.
              </span>
            </div>
            <div className="adminorder-row">
              <span>Total:</span>
              <span>$5000</span>
            </div>
          </div>

          <div className="adminorder-products">
            {Array.from({ length: 3 }).map((_, i) => (
              <div className="adminorder-product" key={i}>
                <h4>Nombre</h4>
                <img src="/img/Cerradura.png" alt="Producto" />
                <div className="adminorder-divider" />
                <div className="adminorder-cantidad">
                  <span>Cantidad:</span>
                  <span>1</span>
                </div>
              </div>
            ))}
          </div>

          <button className="adminorder-btn primary">Entregar pedido</button>
          <button className="adminorder-btn secondary">Descargar recibo</button>
        </div>
      </div>
    </div>
  );
};

export default Adminorder;

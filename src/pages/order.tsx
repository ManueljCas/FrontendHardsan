import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/Order.css"; // Importamos los estilos locales

const Order: React.FC = () => {
  return (
    <>
      <Navbar />
      <div className="order-container">
        <h1 className="order-title">Pedido #1</h1>

        <div className="order-info">
          <div className="order-row">
            <span className="order-label">Estado:</span>
            <span className="order-status">En espera</span>
          </div>
          <div className="order-divider"></div>

          <div className="order-row">
            <span className="order-label">Fecha y hora del pedido:</span>
            <span>27/01/2025 - 09:17:20</span>
          </div>
          <div className="order-divider"></div>

          <div className="order-row">
            <span className="order-label">Hora entrega:</span>
            <span>N/A</span>
          </div>
          <div className="order-divider"></div>

          <div className="order-row">
            <span className="order-label">Nombre del establecimiento:</span>
            <span>HARDSAN | HC (CEDIS)</span>
          </div>
          <div className="order-divider"></div>

          <div className="order-row">
            <span className="order-label">Ubicación del establecimiento:</span>
            <span>
              Quintana Roo, Boulevard Luis Donaldo Colosio Mz. 8 Lote. 8, Bodega G-9 Parque Logístico APQ, 77569 Cancún, Q.R.
            </span>
          </div>
          <div className="order-divider"></div>

          <div className="order-row">
            <span className="order-label">Total:</span>
            <span>$5000</span>
          </div>
        </div>

        <div className="order-products">
          {[1, 2, 3, 4].map((_, index) => (
            <div key={index} className="product-card">
              <p className="product-name">Nombre</p>
              <img src="/img/Cerradura.png" alt="Producto" className="product-image" />
              <div className="product-divider"></div>
              <div className="product-quantity">
                <span>Cantidad:</span>
                <span>1</span>
              </div>
            </div>
          ))}
        </div>

        <button className="download-btn">Descargar recibo</button>
      </div>
      <Footer />
    </>
  );
};

export default Order;

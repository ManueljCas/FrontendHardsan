import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/Orders.css";
import { ordersData } from "@/interfaces/ordersData";

const Orders: React.FC = () => {
  return (
    <>
      <Navbar />
      <div className="orders-container">
        <h2 className="orders-title">Pedidos</h2>
        <div className="orders-grid">
          {ordersData.map((pedido) => (
            <div key={pedido.id} className="order-card">
              <h3 className="order-id">Pedido #{pedido.id}</h3>
              <img 
                src={pedido.img} 
                alt={`Pedido ${pedido.id}`} 
                className="order-image"
              />
              {/* Línea divisoria */}
              <div className="order-divider"></div>
              <div className="order-details">
                <div className="order-footer">
                  <p className="order-date">
                    <img src="/img/reloj.png" alt="Reloj" className="icon-reloj" />
                    {pedido.fecha} - {pedido.hora}
                  </p>
                  {/* ✅ Navegación sin usar librerías */}
                  <button 
                    className="order-btn" 
                    onClick={() => window.location.href = `/order`}
                  >
                    Ver más
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Orders;

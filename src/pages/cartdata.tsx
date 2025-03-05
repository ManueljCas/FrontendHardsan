import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/CartData.css"; // Importamos el CSS específico

const CartData: React.FC = () => {
  return (
    <>
      <Navbar />
      <div className="cartdata-container">
        {/* Sección Izquierda: Formulario de pago */}
        <div className="cartdata-form">
          <h3 className="cartdata-title">Tarjeta de crédito</h3>

          <div className="cartdata-card-section">
            <div className="cartdata-fields">
              <div className="cartdata-input-group">
                <label>Número de tarjeta</label>
                <input type="text" placeholder="**** **** **** ****" className="cartdata-input full-width" />
              </div>
              <div className="cartdata-input-group">
                <label>Nombre y apellido</label>
                <input type="text" placeholder="Nombre en la tarjeta" className="cartdata-input full-width" />
              </div>
              <div className="cartdata-row">
                <div className="cartdata-input-group">
                  <label>Fecha de vencimiento</label>
                  <input type="text" placeholder="MM/AA" className="cartdata-input small" />
                </div>
                <div className="cartdata-input-group">
                  <label>Código de seguridad</label>
                  <input type="text" placeholder="CVC" className="cartdata-input small" />
                </div>
              </div>
            </div>

            {/* Imagen de tarjeta alineada correctamente */}
            <div className="cartdata-card-icon">
              <img src="/img/tarjetaejemplo.png" alt="Tarjeta" />
            </div>
          </div>
        </div>

        {/* Sección Derecha: Total y Continuar */}
        <div className="cartdata-summary">
          <h3 className="cartdata-total-title">Total</h3>
          <p className="cartdata-total-price">$4,000.00</p>
          <button className="cartdata-continue-btn">Continuar</button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CartData;

import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/PaymentMethod.css"; // Importa el CSS específico

const PaymentMethod: React.FC = () => {
  const [selectedMethod, setSelectedMethod] = useState<string | null>("Tarjeta de crédito");

  const handlePayment = () => {
    window.location.href = "/cartdata"; // Simulación de redirección al siguiente paso
  };

  return (
    <>
      <Navbar />
      <div className="payment-container">
        {/* Sección Izquierda: Métodos de pago */}
        <div className="payment-options">
          <h3 className="payment-title">Elige cómo pagar</h3>
          <div className="payment-method" onClick={() => setSelectedMethod("Tarjeta de crédito")}>
            <input type="radio" name="payment" checked={selectedMethod === "Tarjeta de crédito"} readOnly />
            <span className="payment-label">Tarjeta de crédito</span>
            <img src="/img/credit-card.png" alt="Tarjeta de crédito" className="payment-icon" />
          </div>
          <div className="payment-method" onClick={() => setSelectedMethod("Tarjeta de débito")}>
            <input type="radio" name="payment" checked={selectedMethod === "Tarjeta de débito"} readOnly />
            <span className="payment-label">Tarjeta de débito</span>
            <img src="/img/debit-card.png" alt="Tarjeta de débito" className="payment-icon" />
          </div>
        </div>

        {/* Sección Derecha: Total y Continuar */}
        <div className="payment-summary">
          <h3 className="payment-total-title">Total</h3>
          <p className="payment-total-price">$4,000.00</p>
          <button className="payment-continue-btn" onClick={handlePayment}>Continuar</button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PaymentMethod;

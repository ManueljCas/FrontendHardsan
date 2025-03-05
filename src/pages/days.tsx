import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/Days.css"; // Importa el CSS específico

const Days: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState<string | null>(null);

  const availableDays = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
  const unavailableDays = ["Domingo"];

  const handlePayment = () => {
    window.location.href = "/payment_method";
  };

  return (
    <>
      <Navbar />
      <div className="days-container">
        {/* Sección Izquierda: Selección de día */}
        <div className="days-options">
          <h3 className="days-title">Días que puedes recoger tu pedido</h3>
          <div className="days-grid">
            {availableDays.map((day) => (
              <button
                key={day}
                className={`days-button ${selectedDay === day ? "selected" : ""}`}
                onClick={() => setSelectedDay(day)}
              >
                {day}
              </button>
            ))}
          </div>

          <h3 className="days-title unavailable">Días no disponibles</h3>
          <div className="days-grid">
            {unavailableDays.map((day) => (
              <button key={day} className="days-button disabled">
                {day}
              </button>
            ))}
          </div>
        </div>

        {/* Sección Derecha: Total y Continuar */}
        <div className="days-summary">
          <h3 className="days-total-title">Total</h3>
          <p className="days-total-price">$4,000.00</p>
          <button className="days-continue-btn" onClick={handlePayment}>Continuar</button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Days;

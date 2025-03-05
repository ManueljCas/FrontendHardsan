import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/Delivery.css"; // Importa el CSS de esta página

const Delivery: React.FC = () => {
  const [selectedLocation, setSelectedLocation] = useState(1); // Estado para la selección

  const handlePayment = () => {
    window.location.href = "/days";
  };

  const locations = [
    {
      id: 1,
      name: "Recoger en HARDSAN | HC (CEDIS)",
      address: "Quintana Roo, Boulevard Luis Donaldo Colosio Mz. 8 Lote. 8 Bodega G-9 Parque Logístico APQ, 77569 Cancún, Q.R.",
    },
    {
      id: 2,
      name: "HARDSAN HC - Sucursal Huayacán",
      address: "Av. Huayacán SM 311 Local 4 y 5 Plaza, Andara, 77533 Cancún, Q.R.",
    },
    {
      id: 3,
      name: "HARDSAN HC - Sucursal Talleres",
      address: "Av. Puerto Juárez 92, 77516 Cancún, Q.R.",
    },
    {
      id: 4,
      name: "HARDSAN HC - Sucursal Playa del Carmen",
      address: "Av Benito Juárez 15-211 Lpte, Ejidal, 77712 Playa del Carmen, Q.R.",
    },
  ];

  return (
    <>
      <Navbar />
      <div className="delivery-container">
        {/* Sección Izquierda: Selección de sucursal */}
        <div className="delivery-options">
          <h3 className="delivery-title">Lugares donde puedes recoger tu pedido</h3>
          {locations.map((location) => (
            <label key={location.id} className="delivery-option">
              <input
                type="radio"
                name="pickup-location"
                checked={selectedLocation === location.id}
                onChange={() => setSelectedLocation(location.id)}
              />
              <div>
                <strong>{location.name}</strong>
                <p>{location.address}</p>
              </div>
            </label>
          ))}
        </div>

        {/* Sección Derecha: Total y Continuar */}
        <div className="delivery-summary">
          <h3 className="delivery-total-title">Total</h3>
          <p className="delivery-total-price">$4,000.00</p>
          <button className="delivery-continue-btn" onClick={handlePayment}>Continuar</button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Delivery;

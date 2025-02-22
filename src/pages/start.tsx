import React from "react";
import Navbar from "../components/Navbar"; // Importa el Header


const Start: React.FC = () => {

  return (
    <div>
      <Navbar /> {/* Incluye el Header en la parte superior */}
      <div className="content">
        <h1></h1> {/* Muestra el mensaje dinámico */}
        <h2>Hola mundo</h2>
        <ul>
        
        </ul>
      </div>
    </div>
  );
};

export default Start;

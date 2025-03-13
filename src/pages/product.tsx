import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/Product.css";

const imageList = [
  "/img/Cerradura.png",
  "/img/Cajafuerte.png",
  "/img/Cerradura.png",
  "/img/Cajafuerte.png",
];

const Product: React.FC = () => {
  const [mainImage, setMainImage] = useState<string>(imageList[0]);

  return (
    <>
      <Navbar />
      <div className="product-container">
        <div className="product-gallery">
          <div className="thumbnail-list">
            {imageList.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Miniatura ${index + 1}`}
                onMouseEnter={() => setMainImage(img)}
                // Si prefieres que cambie al dar clic en lugar de pasar el mouse:
                // onClick={() => setMainImage(img)}
              />
            ))}
          </div>
          <div className="main-image">
            <img src={mainImage} alt="Producto principal" />
          </div>
        </div>

        <div className="product-details">
          <h2>Cerradura Yale YRD6</h2>
          <p><strong>Costo:</strong> $1000</p>
          <p><strong>Marca:</strong> <span className="brand">Yale</span></p>
          <p><strong>Disponible:</strong> 38</p>
          <button className="add-to-cart">Agregar al carrito</button>
        </div>
      </div>

      <div className="description-section">
        <h3>Descripción</h3>
        <p>
          La Cerradura Digital Yale YMC300 cuenta con apertura con código y llave,
          además con la ayuda del módulo Zigbee y el Hub de Yale, podrás abrir tu cerradura
          con la ayuda de tu celular, todo esto mediante la aplicación de Yale Connect.
        </p>
      </div>

      <div className="features-section">
        <h3>Características:</h3>
        <ul>
          <li>Abrir desde cualquier parte mediante la aplicación Yale Connect.</li>
          <li>Generar códigos con límite de tiempo activos.</li>
          <li>Recibirás notificaciones cuando la cerradura se encuentre abierta.</li>
          <li>Funciona con 4 pilas alcalinas AA.</li>
          <li>Puerto de emergencia USB.</li>
        </ul>
      </div>

      <Footer />
    </>
  );
};

export default Product;

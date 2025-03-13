import React, { useState } from "react";
import "../../styles/NewProducts.css";

const allProducts = [
  { name: "Cerradura Yale YRD6", image: "/img/Cerradura.png" },
  { name: "Caja Fuerte Yale Chica", image: "/img/CajaFuerte.png" },
  { name: "Cerradura Yale YRD6", image: "/img/Cerradura.png" },
  { name: "Caja Fuerte Yale Chica", image: "/img/CajaFuerte.png" },
  { name: "Cerradura Yale YRD6", image: "/img/Cerradura.png" },
  { name: "Caja Fuerte Yale Chica", image: "/img/CajaFuerte.png" },
  { name: "Cerradura Yale YRD6", image: "/img/Cerradura.png" },
  { name: "Caja Fuerte Yale Chica", image: "/img/CajaFuerte.png" },
  { name: "Cerradura Yale YRD6", image: "/img/Cerradura.png" },
  { name: "Caja Fuerte Yale Chica", image: "/img/CajaFuerte.png" },
  { name: "Cerradura Yale YRD6", image: "/img/Cerradura.png" },
  { name: "Caja Fuerte Yale Chica", image: "/img/CajaFuerte.png" },
];

const NewProducts: React.FC = () => {
  const [visibleCount, setVisibleCount] = useState(4);

  const showMore = () => {
    setVisibleCount((prev) => prev + 4);
  };

  const visibleProducts = allProducts.slice(0, visibleCount);
  const hasMore = visibleCount < allProducts.length;

  return (
    <section>
      <div className="start-product-container">
        <h2 className="start-product-title">Productos nuevos</h2>
        <div className="start-product-grid">
          {visibleProducts.map((product, index) => (
            <div className="start-product-wrapper" key={index}>
              <div className="start-product-card">
                <img src={product.image} alt={product.name} />
              </div>
              <p className="start-product-name">{product.name}</p>
            </div>
          ))}
        </div>

        {hasMore && (
          <div className="start-product-see-more" onClick={showMore}>
            <span>ver más</span>
          </div>
        )}
      </div>
      <hr className="divider" />
    </section>
  );
};

export default NewProducts;

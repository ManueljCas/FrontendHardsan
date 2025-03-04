import React, { useState } from "react"; 
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/Products.css";

import { allProducts } from "../interfaces/products"; 

const Products: React.FC = () => {
  const [visibleProducts, setVisibleProducts] = useState<number>(8);

  const loadMoreProducts = () => {
    setVisibleProducts((prev: number) => prev + 8);
  };

  const handleProductClick = () => {
    window.location.href = `/product`;
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <aside className="filters">
          <h3>Filtros</h3>
          <hr />
          <div className="filter-section">
            <label><input type="checkbox" /> Precio</label>
            <label><input type="checkbox" /> Categoría</label>
            <label><input type="checkbox" /> Nombre</label>
            <label><input type="checkbox" /> Filtros</label>
          </div>

          <h4>Categoría</h4>
          <hr />
          <div className="filter-section">
            <label><input type="checkbox" /> Precio</label>
            <label><input type="checkbox" /> Categoría</label>
            <label><input type="checkbox" /> Nombre</label>
            <label><input type="checkbox" /> Filtros</label>
          </div>

          <h4>Marca</h4>
          <hr />
          <div className="filter-section">
            <label><input type="checkbox" /> Precio</label>
            <label><input type="checkbox" /> Categoría</label>
            <label><input type="checkbox" /> Nombre</label>
            <label><input type="checkbox" /> Filtros</label>
          </div>

          <h4>Color</h4>
          <hr />
          <div className="filter-section">
            <label><input type="checkbox" /> Precio</label>
            <label><input type="checkbox" /> Categoría</label>
            <label><input type="checkbox" /> Nombre</label>
            <label><input type="checkbox" /> Filtros</label>
          </div>

          <h4>Precio</h4>
          <hr />
          <input type="range" min="0" max="10000" />
          <div className="price-range">
            <span>$0</span> <span>$10000</span>
          </div>
        </aside>

        <section className="products">
          <h2>Productos</h2>
          <div className="product-grid">
            {allProducts.slice(0, visibleProducts).map((product) => (
              <div
                key={product.id}
                className="product-card"
                onClick={() => handleProductClick()}
              >
                <img src={product.image} alt={product.name} />
                <p>{product.name}</p>
                <p>{product.price}</p>
              </div>
            ))}
          </div>

          {visibleProducts < allProducts.length && (
            <button className="view-more" onClick={loadMoreProducts}>
              Ver más 
            </button>
          )}
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Products;

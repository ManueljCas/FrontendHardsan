import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { mockProducts } from "@/interfaces/mockProducts";
import { categories } from "@/interfaces/mockProducts";
import "../styles/Products.css";

const Products: React.FC = () => {
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const [openFilter, setOpenFilter] = useState<string | null>(null);

  const toggleCategory = (cat: string) => {
    setOpenCategory(openCategory === cat ? null : cat);
  };

  const toggleFilter = (filter: string) => {
    setOpenFilter(openFilter === filter ? null : filter);
  };

  const filters = ["Marca", "Alta", "Cierre", "Color", "Precio", "Rueda"];

  return (
    <>
      <Navbar />
      <div className="products-container">
        <div className="products-layout">
          <aside className="products-sidebar">
            <div className="sidebar-section">
              <h3>Productos</h3>
              <p className="sidebar-link active">Todos los productos</p>
              {categories.map((cat, i) => (
                <div key={i}>
                  <p className="sidebar-link" onClick={() => toggleCategory(cat.name)}>
                    {cat.name}
                    <span>{openCategory === cat.name ? "▲" : "▼"}</span>
                  </p>
                  {openCategory === cat.name &&
                    cat.sub.length > 0 &&
                    cat.sub.map((sub, j) => (
                      <p key={j} className="sidebar-sublink">{sub} (106)</p>
                    ))}
                </div>
              ))}
            </div>

            <div className="sidebar-section">
              <h3>Filtros</h3>
              {filters.map((filter, i) => (
                <div key={i}>
                  <p className="sidebar-link" onClick={() => toggleFilter(filter)}>
                    <strong>{filter}</strong>
                    <span>{openFilter === filter ? "▲" : "▼"}</span>
                  </p>
                  {openFilter === filter && (
                    <div>
                      <p className="sidebar-sublink">Ejemplo 1</p>
                      <p className="sidebar-sublink">Ejemplo 2</p>
                      <p className="sidebar-sublink">Ejemplo 3</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </aside>

          <div className="products-box">
            <div className="products-content">
              <div className="products-header">
                <h1 className="products-title">Todos los productos</h1>
                <div className="products-toolbar">
                  <span>Mostrando 1 - 24 de 1135 productos</span>
                  <span>Mostrar: 24 por página ▼</span>
                  <span>Ordenar por: Alfabéticamente, A-Z ▼</span>
                  <span className="products-view">
                    Ver
                    <span className="icon-grid">⬛</span>
                    <span className="icon-list">☰</span>
                  </span>
                </div>
              </div>

              <div className="products-grid">
                {mockProducts.map((product) => (
                  <div
                    key={product.id}
                    className="product-card"
                    onClick={() => window.location.href = `/product`}
                    style={{ cursor: "pointer" }}
                  >
                    {product.isNew && <span className="product-badge">Nuevo</span>}
                    <div className="product-image">
                      <img src={product.img1} alt={product.name} className="img-main" />
                      <img src={product.img2} alt={product.name} className="img-hover" />
                    </div>
                    <p className="product-brand">{product.brand}</p>
                    <h2 className="product-name">{product.name}</h2>
                    <p className="product-price">${product.price.toFixed(2)} MXN</p>
                    {product.available && <p className="product-status">🟢 Disponible</p>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Products;

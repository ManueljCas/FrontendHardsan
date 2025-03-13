import React from "react";
import "../../styles/Categories.css";

const categories = [
  { name: "Candados", image: "/img/Candados.png" },
  { name: "Digitales", image: "/img/Digitales.png" },
  { name: "Corredderas", image: "/img/Correderas.png" },
  { name: "Tornilleria", image: "/img/tornilleria.png" },
];

const Categories: React.FC = () => {
  return (
    <section>
      <div className="categories-container">
        <h2 className="categories-title">Categorías</h2>

        <div className="categories-top">
          <div className="category-large">
            <img src={categories[0].image} alt={categories[0].name} />
            <p>{categories[0].name}</p>
          </div>
          <div className="category-small">
            <p>{categories[1].name}</p>
            <img src={categories[1].image} alt={categories[1].name} />
          </div>
        </div>

        <div className="categories-bottom">
          <div className="category-small">
            <p>{categories[2].name}</p>
            <img src={categories[2].image} alt={categories[2].name} />
          </div>

          {/* Tornillería con clase personalizada */}
          <div className="category-large tornilleria-custom">
            <p>{categories[3].name}</p>
            <img src={categories[3].image} alt={categories[3].name} />
          </div>
        </div>
      </div>
      <hr className="divider" />
    </section>
  );
};

export default Categories;

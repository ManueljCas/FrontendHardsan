import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/Cart.css";

const Cart: React.FC = () => {
  const products = [
    { id: 1, name: "Cerradura Yale YRD6", price: 100, quantity: 10, image: "/img/Cerradura.png" },
    { id: 2, name: "Cerradura Yale YRD6", price: 100, quantity: 10, image: "/img/Cerradura.png" },
    { id: 3, name: "Cerradura Yale YRD6", price: 100, quantity: 10, image: "/img/Cerradura.png" },
    { id: 4, name: "Cerradura Yale YRD6", price: 100, quantity: 10, image: "/img/Cerradura.png" },
  ];

  const handlePayment = () => {
    window.location.href = "/delivery";
  };
  
  const totalPrice = products.reduce((sum, product) => sum + product.price * product.quantity, 0);

  return (
    <>
      <Navbar />
      <div className="cart-container">
        <div className="cart-items">
          <table className="cart-table">
            <thead>
              <tr>
                <th className="cart-header">Producto</th>
                <th className="cart-header">Precio</th>
                <th className="cart-header">Cantidad</th>
                <th className="cart-header">Total</th>
                <th className="cart-header">Acción</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="cart-row">
                  <td>
                    <div className="cart-image-container">
                      <img src={product.image} alt={product.name} className="cart-image" />
                    </div>
                  </td>
                  <td className="cart-price">${product.price}</td>
                  <td className="cart-quantity">{product.quantity}</td>
                  <td className="cart-total">${product.price * product.quantity}</td>
                  <td>
                    <button className="cart-delete-btn">Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="cart-actions">
            <button className="cart-add-more">Agregar más</button>
            <button className="cart-delete-all">Eliminar todo</button>
          </div>
        </div>

        <div className="cart-summary">
          <h3 className="cart-total-title">Total</h3>
          <p className="cart-total-price">${totalPrice.toFixed(2)}</p>
          <button className="cart-pay-btn" onClick={handlePayment}>Pagar</button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Cart;

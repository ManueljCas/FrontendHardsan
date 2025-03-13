import React from "react";
import NavbarAdmin from "../components/QWRtaW5Db25maWc=";
import "../styles/NavbarAdmin.css";
import "../styles/Admindashboard.css";

const Admindashboard = () => {
  return (
    <div className="navbaradmin-layout">
      <NavbarAdmin />
      <div className="navbaradmin-content">
        <h2>Productos vendidos</h2>
        <div className="bar-chart">
          <div className="bar" style={{ height: "50%" }}></div>
          <div className="bar" style={{ height: "80%" }}></div>
          <div className="bar" style={{ height: "60%" }}></div>
          <div className="bar" style={{ height: "90%" }}></div>
        </div>

        <h2>Productos vendidos</h2>
        <div className="bar-chart">
          <div className="bar" style={{ height: "40%" }}></div>
          <div className="bar" style={{ height: "70%" }}></div>
          <div className="bar" style={{ height: "55%" }}></div>
          <div className="bar" style={{ height: "85%" }}></div>
        </div>
      </div>
    </div>
  );
};

export default Admindashboard;

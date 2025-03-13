import React, { useState } from "react";
import NavbarAdmin from "../components/QWRtaW5Db25maWc=";
import "../styles/Adminorders.css";
import { useRouter } from "next/router";

const Adminorders: React.FC = () => {
  const [menuActivo, setMenuActivo] = useState<number | null>(null);
  const router = useRouter();

  const pedidos = Array.from({ length: 13 }, (_, i) => ({
    id: i + 1,
    fecha: "27/01/2025 - 09:17:20",
    usuario: "jesus.castro.pech@gmail.com",
    estado: i === 0 ? "Entregado" : "En proceso",
  }));

  const toggleMenu = (id: number) => {
    setMenuActivo(menuActivo === id ? null : id);
  };

  const cerrarMenus = () => {
    setMenuActivo(null);
  };

  return (
    <div className="adminorders-layout" onClick={cerrarMenus}>
      <NavbarAdmin />
      <div className="adminorders-content" onClick={(e) => e.stopPropagation()}>
        <h2 className="adminorders-title">Pedidos</h2>

        <div className="adminorders-search">
          <input type="text" placeholder="Buscar pedidos..." />
          <button>Buscar</button>
        </div>

        <div className="adminorders-table-wrapper">
          <table className="adminorders-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Fecha y hora</th>
                <th>Usuario</th>
                <th>Estado</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {pedidos.map((p) => (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>{p.fecha}</td>
                  <td>{p.usuario}</td>
                  <td className={p.estado === "Entregado" ? "entregado" : "enproceso"}>
                    {p.estado}
                  </td>
                  <td className="adminorders-acciones">
                    <button className="adminorders-menu-toggle" onClick={() => toggleMenu(p.id)}>
                      ⋮
                    </button>
                    {menuActivo === p.id && (
                      <div className="adminorders-menu">
                        <button>Eliminar</button>
                        <button onClick={() => router.push("/QWRtaW5vcmRlcnM=")}>Detalles</button>
                        <button>
                          {p.estado === "Entregado" ? "En proceso" : "Entregar"}
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="adminorders-pagination">13 &nbsp; 13 &nbsp; 13</div>
      </div>
    </div>
  );
};

export default Adminorders;

import React, { useState, useEffect } from "react";
import NavbarAdmin from "../components/QWRtaW5Db25maWc=";
import { useRouter } from "next/router";
import { ProductoBackend } from "../interfaces/productoBackend";
import "../styles/Adminproducts.css";

const Adminproducts: React.FC = () => {
  const router = useRouter();
  const [productos, setProductos] = useState<ProductoBackend[]>([]);
  const [menuActivo, setMenuActivo] = useState<number | null>(null);
  const [paginaActual, setPaginaActual] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [busqueda, setBusqueda] = useState("");
  const [allProductos, setAllProductos] = useState<ProductoBackend[]>([]);

  const pageSize = 10;

  const fetchProductos = async () => {
    try {
      const res = await fetch(
        `https://localhost:7130/api/Producto/paged?page=${paginaActual}&pageSize=${pageSize}`
      );
      if (!res.ok) throw new Error("Error al obtener productos");

      const data = await res.json();

      if (Array.isArray(data.productos)) {
        const productosMapeados: ProductoBackend[] = data.productos.map((p: ProductoBackend) => ({
          iD_Producto: p.iD_Producto,
          nombre: p.nombre,
          precio: p.precio,
          stock: p.stock,
          marca: p.marca,
          imagen: p.imagen,
          cantidadVendida: p.cantidadVendida ?? 0,
        }));

        setProductos(productosMapeados);
        setAllProductos(productosMapeados);
        setTotalPaginas(Math.ceil(data.total / data.pageSize));
      } else {
        setProductos([]);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const buscarProducto = () => {
    const texto = busqueda.trim().toLowerCase();

    if (!texto) {
      setProductos(allProductos);
    } else {
      const filtrado = allProductos.filter((p) => {
        const coincideNombre = p.nombre.toLowerCase().includes(texto);
        const coincideID = p.iD_Producto.toString() === texto;
        return coincideNombre || coincideID;
      });

      setProductos(filtrado);
    }
  };

  useEffect(() => {
    fetchProductos();
  }, [paginaActual]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        !target.closest(".adminproducts-menu") &&
        !target.closest(".adminproducts-menu-toggle")
      ) {
        setMenuActivo(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleMenu = (id: number) => {
    setMenuActivo((prev) => (prev === id ? null : id));
  };

  const cambiarPagina = (nuevaPagina: number) => {
    if (nuevaPagina >= 1 && nuevaPagina <= totalPaginas) {
      setPaginaActual(nuevaPagina);
    }
  };

  const renderPaginacion = () => {
    const paginas = [];
    for (let i = 1; i <= totalPaginas; i++) {
      paginas.push(
        <button
          key={i}
          className={`adminproducts-page-button ${i === paginaActual ? "active" : ""}`}
          onClick={() => cambiarPagina(i)}
        >
          {i}
        </button>
      );
    }

    return (
      <div className="adminproducts-pagination">
        <button onClick={() => cambiarPagina(paginaActual - 1)} disabled={paginaActual === 1}>
          ◀
        </button>
        {paginas}
        <button
          onClick={() => cambiarPagina(paginaActual + 1)}
          disabled={paginaActual === totalPaginas}
        >
          ▶
        </button>
      </div>
    );
  };

  return (
    <div className="adminproducts-layout">
      <NavbarAdmin />
      <div className="adminproducts-content">
        <h2 className="adminproducts-title">Productos</h2>

        <div className="adminproducts-search">
          <input
            type="text"
            placeholder="Buscar por nombre o ID..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
          <button onClick={buscarProducto}>Buscar</button>
        </div>

        <div className="adminproducts-table-wrapper">
          <table className="adminproducts-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Stock</th>
                <th>Marca</th>
                <th>Vendidos</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {productos.length > 0 ? (
                productos.map((p) => {
                  const isOpen = menuActivo === p.iD_Producto;
                  if (!p.iD_Producto) return null;

                  return (
                    <tr key={`producto-${p.iD_Producto}`}>
                      <td>{p.iD_Producto}</td>
                      <td>{p.nombre}</td>
                      <td>${p.precio}</td>
                      <td>{p.stock}</td>
                      <td>{p.marca}</td>
                      <td>{p.cantidadVendida}</td>
                      <td style={{ position: "relative" }}>
                        <button
                          className="adminproducts-menu-toggle"
                          onClick={() => toggleMenu(p.iD_Producto)}
                        >
                          ⋮
                        </button>

                        {isOpen && (
                          <div className="adminproducts-menu">
                            <button onClick={() => alert(`Eliminar ${p.nombre}`)}>Eliminar</button>
                            <button
                              onClick={() =>
                                router.push(`/Admineditproduct?id=${p.iD_Producto}`)
                              }
                            >
                              Editar
                            </button>
                            <button
                              onClick={() =>
                                router.push(`/Admindetailsproduct?id=${p.iD_Producto}`)
                              }
                            >
                              Detalles
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={7} style={{ textAlign: "center" }}>
                    No hay productos disponibles.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {renderPaginacion()}

        <button
          className="adminproducts-create"
          onClick={() => router.push("/Admincreateproduct")}
        >
          Crear producto
        </button>
      </div>
    </div>
  );
};

export default Adminproducts;
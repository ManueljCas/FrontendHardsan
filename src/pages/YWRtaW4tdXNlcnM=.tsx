import React, { useState, useEffect } from "react";
import NavbarAdmin from "../components/QWRtaW5Db25maWc=";
import "../styles/Adminusers.css";
import { useRouter } from "next/router";

interface UsuarioBackend {
  iD_Usuario: number;
  nombre: string;
  correo: string;
  telefono: string;
  estado: string;
  rol: string;
}

const Adminusers: React.FC = () => {
  const router = useRouter();
  const [usuarios, setUsuarios] = useState<UsuarioBackend[]>([]);
  const [menuActivo, setMenuActivo] = useState<number | null>(null);
  const [busqueda, setBusqueda] = useState("");
  const [paginaActual, setPaginaActual] = useState(1);
  const pageSize = 10;

  const fetchUsuarios = async () => {
    try {
      const res = await fetch("https://localhost:7130/api/AdminUsuarios/list");
      const data = await res.json();
      setUsuarios(data);
    } catch (error) {
      console.error("Error al obtener usuarios", error);
    }
  };

  const eliminarUsuario = async (id: number) => {
    const confirmar = confirm("¿Estás seguro de eliminar este usuario?");
    if (!confirmar) return;

    try {
      const res = await fetch(`https://localhost:7130/api/AdminUsuarios/delete/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error();
      fetchUsuarios();
    } catch {
      alert("Error al eliminar usuario");
    }
  };

  const cambiarEstado = async (id: number) => {
    try {
      const res = await fetch(`https://localhost:7130/api/AdminUsuarios/toggle/${id}`, {
        method: "PUT",
      });
      if (!res.ok) throw new Error();
      fetchUsuarios();
    } catch {
      alert("Error al cambiar el estado del usuario");
    }
  };

  const usuariosFiltrados = usuarios.filter(
    (u) =>
      u.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      u.iD_Usuario.toString() === busqueda
  );

  const totalPaginas = Math.ceil(usuariosFiltrados.length / pageSize);
  const paginados = usuariosFiltrados.slice(
    (paginaActual - 1) * pageSize,
    paginaActual * pageSize
  );

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const cambiarPagina = (nueva: number) => {
    if (nueva >= 1 && nueva <= totalPaginas) {
      setPaginaActual(nueva);
    }
  };

  const cerrarMenus = () => setMenuActivo(null);
  const toggleMenu = (id: number) => {
    setMenuActivo((prev) => (prev === id ? null : id));
  };

  return (
    <div className="adminusers-layout" onClick={cerrarMenus}>
      <NavbarAdmin />
      <div className="adminusers-content" onClick={(e) => e.stopPropagation()}>
        <h2 className="adminusers-title">Usuarios</h2>

        <div className="adminusers-search">
          <input
            type="text"
            placeholder="Buscar por nombre o ID..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
          <button onClick={fetchUsuarios}>Refrescar</button>
        </div>

        <div className="adminusers-table-wrapper">
          <table className="adminusers-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Correo</th>
                <th>Teléfono</th>
                <th>Rol</th>
                <th>Estado</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {paginados.map((u) => (
                <tr key={u.iD_Usuario}>
                  <td>{u.iD_Usuario}</td>
                  <td>{u.nombre}</td>
                  <td>{u.correo}</td>
                  <td>{u.telefono || "—"}</td>
                  <td>{u.rol}</td>
                  <td className={u.estado === "Activo" ? "activo" : "desactivado"}>
                    {u.estado}
                  </td>
                  <td className="adminusers-acciones">
                    <button
                      className="adminusers-menu-toggle"
                      onClick={() => toggleMenu(u.iD_Usuario)}
                    >
                      ⋮
                    </button>

                    {menuActivo === u.iD_Usuario && (
                      <div className="adminusers-menu">
                        <button onClick={() => eliminarUsuario(u.iD_Usuario)}>Eliminar</button>
                        <button
                          onClick={() =>
                            router.push(`/QWRtaW51c2Vycw==?id=${u.iD_Usuario}`)
                          }
                        >
                          Editar
                        </button>
                        <button onClick={() => cambiarEstado(u.iD_Usuario)}>
                          {u.estado === "Activo" ? "Desactivar" : "Activar"}
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Paginación */}
        <div className="adminusers-pagination">
          <button onClick={() => cambiarPagina(paginaActual - 1)} disabled={paginaActual === 1}>
            ◀
          </button>
          {Array.from({ length: totalPaginas }, (_, i) => (
            <button
              key={i + 1}
              className={paginaActual === i + 1 ? "active" : ""}
              onClick={() => cambiarPagina(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => cambiarPagina(paginaActual + 1)}
            disabled={paginaActual === totalPaginas}
          >
            ▶
          </button>
        </div>

        <button
          className="adminusers-create"
          onClick={() => router.push("/QWRtaW51c2Vycw==")}
        >
          Crear usuario
        </button>
      </div>
    </div>
  );
};

export default Adminusers;

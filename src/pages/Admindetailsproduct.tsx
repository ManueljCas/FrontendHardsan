import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import NavbarAdmin from "../components/QWRtaW5Db25maWc=";
import NotificationContainer from "../components/NotificationContainer";
import { NotificationType } from "../interfaces/NotificationInterface";
import "../styles/Admincreateproduct.css";

const Admindetailsproduct: React.FC = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [notifications, setNotifications] = useState<NotificationType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [stock, setStock] = useState("");
  const [marca, setMarca] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [caracteristicas, setCaracteristicas] = useState("");
  const [categoria, setCategoria] = useState("");
  const [etiqueta, setEtiqueta] = useState("");
  const [tipo, setTipo] = useState("");
  const [material, setMaterial] = useState("");
  const [color, setColor] = useState("");
  const [previews, setPreviews] = useState<string[]>([]);

  const addNotification = (message: string, type: "success" | "error" | "info" | "warning") => {
    const newNotification: NotificationType = { id: Date.now(), message, type };
    setNotifications((prev) => [...prev, newNotification]);
    setTimeout(() => removeNotification(newNotification.id), 5000);
  };

  const removeNotification = (id: number) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  useEffect(() => {
    const cargarProducto = async () => {
      try {
        const res = await fetch(`https://localhost:7130/api/Producto/${id}`);
        if (!res.ok) throw new Error("No se pudo cargar el producto");
        const data = await res.json();

        setNombre(data.nombre);
        setPrecio(data.precio);
        setStock(data.stock);
        setMarca(data.marca);
        setDescripcion(data.descripcion);
        setCaracteristicas(data.caracteristicas);
        setCategoria(data.categoria);
        setEtiqueta(data.etiqueta);
        setTipo(data.tipo);
        setMaterial(data.material);
        setColor(data.color);
        setPreviews(data.imagenes || []);
      } catch (error) {
        console.error(error);
        addNotification("Error al obtener el producto", "error");
      } finally {
        setIsLoading(false);
      }
    };

    if (id) cargarProducto();
  }, [id]);

  return (
    <div className="admincreateproduct-layout">
      <NavbarAdmin />
      <NotificationContainer notifications={notifications} removeNotification={removeNotification} />

      <div className="admincreateproduct-content">
        <h2 className="admincreateproduct-title">Detalles del producto</h2>

        {isLoading ? (
          <p>Cargando producto...</p>
        ) : (
          <form className="admincreateproduct-card">
            {previews.length > 0 && (
              <div className="admincreateproduct-previews">
                {previews.map((src, index) => (
                  <img key={index} src={src} alt={`Vista previa ${index + 1}`} />
                ))}
              </div>
            )}

            <label>Nombre:</label>
            <input type="text" value={nombre} disabled />

            <label>Precio:</label>
            <input type="number" value={precio} disabled />

            <label>Stock:</label>
            <input type="number" value={stock} disabled />

            <label>Marca:</label>
            <input type="text" value={marca} disabled />

            <label>Descripción:</label>
            <textarea value={descripcion} disabled />

            <label>Características:</label>
            <textarea value={caracteristicas} disabled />

            <label>Categoría:</label>
            <input type="text" value={categoria} disabled />

            <label>Etiqueta:</label>
            <input type="text" value={etiqueta} disabled />

            <label>Tipo:</label>
            <input type="text" value={tipo} disabled />

            <label>Material:</label>
            <input type="text" value={material} disabled />

            <label>Color:</label>
            <input type="text" value={color} disabled />
          </form>
        )}
      </div>
    </div>
  );
};

export default Admindetailsproduct;

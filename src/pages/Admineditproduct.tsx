import React, { useEffect, useState, useRef } from "react";
import { useSearchParams } from "next/navigation";
import NavbarAdmin from "../components/QWRtaW5Db25maWc=";
import NotificationContainer from "../components/NotificationContainer";
import { NotificationType } from "../interfaces/NotificationInterface";
import "../styles/Admincreateproduct.css";

const Admineditproduct: React.FC = () => {
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
  const [images, setImages] = useState<File[]>([]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const addNotification = (message: string, type: "success" | "error" | "info" | "warning") => {
    const newNotification: NotificationType = { id: Date.now(), message, type };
    setNotifications((prev) => [...prev, newNotification]);
    setTimeout(() => removeNotification(newNotification.id), 5000);
  };

  const removeNotification = (id: number) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const triggerFileInput = () => fileInputRef.current?.click();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const selectedFiles = Array.from(files);
    if (selectedFiles.length < 1 || selectedFiles.length > 5) {
      addNotification("Debes subir entre 1 y 5 imágenes.", "warning");
      return;
    }

    const urls = selectedFiles.map((file) => URL.createObjectURL(file));
    setPreviews(urls);
    setImages(selectedFiles);
  };

  const validarFormulario = () => {
    if (!nombre.trim() || nombre.length < 3) {
      addNotification("El nombre debe tener al menos 3 caracteres.", "warning");
      return false;
    }
    if (!precio || isNaN(Number(precio)) || Number(precio) <= 0) {
      addNotification("El precio debe ser un número positivo.", "warning");
      return false;
    }
    if (!stock || isNaN(Number(stock)) || Number(stock) < 0) {
      addNotification("El stock debe ser un número mayor o igual a 0.", "warning");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validarFormulario()) return;

    const formData = new FormData();
    formData.append("ID_Producto", id ?? "");
    formData.append("Nombre", nombre);
    formData.append("Precio", precio);
    formData.append("Stock", stock);
    formData.append("Marca", marca);
    formData.append("Descripcion", descripcion);
    formData.append("Caracteristicas", caracteristicas);
    formData.append("Categoria", categoria);
    formData.append("Etiqueta", etiqueta);
    formData.append("Tipo", tipo);
    formData.append("Material", material);
    formData.append("Color", color);

    // Solo enviar imágenes si el usuario subió nuevas
    if (images.length > 0) {
      images.forEach((img) => formData.append("imagenes", img));
    }

    try {
      const response = await fetch(`https://localhost:7130/api/Producto/Update`, {
        method: "PUT",
        body: formData,
      });

      if (!response.ok) throw new Error("Error al actualizar el producto");

      addNotification("Producto actualizado correctamente", "success");
    } catch (error) {
      console.error(error);
      addNotification("Error al actualizar el producto", "error");
    }
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
        <h2 className="admincreateproduct-title">Editar producto</h2>

        {isLoading ? (
          <p>Cargando producto...</p>
        ) : (
          <form className="admincreateproduct-card" onSubmit={handleSubmit}>
            {previews.length > 0 && (
              <div className="admincreateproduct-previews">
                {previews.map((src, index) => (
                  <img key={index} src={src} alt={`Vista previa ${index + 1}`} />
                ))}
              </div>
            )}

            <button type="button" onClick={triggerFileInput} className="admincreateproduct-upload-btn">
              Cambiar imágenes
            </button>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              style={{ display: "none" }}
              onChange={handleImageChange}
            />

            <label>Nombre:</label>
            <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />

            <label>Precio:</label>
            <input type="number" value={precio} onChange={(e) => setPrecio(e.target.value)} />

            <label>Stock:</label>
            <input type="number" value={stock} onChange={(e) => setStock(e.target.value)} />

            <label>Marca:</label>
            <input type="text" value={marca} onChange={(e) => setMarca(e.target.value)} />

            <label>Descripción:</label>
            <textarea value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />

            <label>Características:</label>
            <textarea value={caracteristicas} onChange={(e) => setCaracteristicas(e.target.value)} />

            <label>Categoría:</label>
            <input type="text" value={categoria} onChange={(e) => setCategoria(e.target.value)} />

            <label>Etiqueta:</label>
            <input type="text" value={etiqueta} onChange={(e) => setEtiqueta(e.target.value)} />

            <label>Tipo:</label>
            <input type="text" value={tipo} onChange={(e) => setTipo(e.target.value)} />

            <label>Material:</label>
            <input type="text" value={material} onChange={(e) => setMaterial(e.target.value)} />

            <label>Color:</label>
            <input type="text" value={color} onChange={(e) => setColor(e.target.value)} />

            <button type="submit">Actualizar producto</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Admineditproduct;

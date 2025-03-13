import React, { useState, useRef } from "react";
import NavbarAdmin from "../components/QWRtaW5Db25maWc=";
import NotificationContainer from "../components/NotificationContainer";
import { NotificationType } from "../interfaces/NotificationInterface";
import "../styles/Admincreateproduct.css";

const Admincreateproduct: React.FC = () => {
  const [previews, setPreviews] = useState<string[]>([]);
  const [images, setImages] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [notifications, setNotifications] = useState<NotificationType[]>([]);

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

  const addNotification = (message: string, type: "success" | "error" | "info" | "warning") => {
    const newNotification: NotificationType = { id: Date.now(), message, type };
    setNotifications((prev) => [...prev, newNotification]);
    setTimeout(() => removeNotification(newNotification.id), 5000);
  };

  const removeNotification = (id: number) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

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

  const triggerFileInput = () => fileInputRef.current?.click();

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
    if (descripcion.length > 500) {
      addNotification("La descripción no puede superar los 500 caracteres.", "warning");
      return false;
    }
    if (caracteristicas.length > 500) {
      addNotification("Las características no pueden superar los 500 caracteres.", "warning");
      return false;
    }
    if (images.length === 0) {
      addNotification("Debes subir al menos una imagen.", "warning");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validarFormulario()) return;

    const formData = new FormData();
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
    images.forEach((img) => formData.append("imagenes", img));

    try {
      const response = await fetch("https://localhost:7130/api/Producto/Create", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Error al guardar el producto.");

      await response.json();
      addNotification("Producto guardado correctamente", "success");

      // Limpiar formulario
      setNombre("");
      setPrecio("");
      setStock("");
      setMarca("");
      setDescripcion("");
      setCaracteristicas("");
      setCategoria("");
      setEtiqueta("");
      setTipo("");
      setMaterial("");
      setColor("");
      setImages([]);
      setPreviews([]);
    } catch (error) {
      addNotification("Error al guardar el producto", "error");
      console.error(error);
    }
  };

  return (
    <div className="admincreateproduct-layout">
      <NavbarAdmin />
      <NotificationContainer notifications={notifications} removeNotification={removeNotification} />
      <div className="admincreateproduct-content">
        <h2 className="admincreateproduct-title">Agregar producto</h2>

        <form className="admincreateproduct-card" onSubmit={handleSubmit}>
          {previews.length > 0 && (
            <div className="admincreateproduct-previews">
              {previews.map((src, index) => (
                <img key={index} src={src} alt={`Vista previa ${index + 1}`} />
              ))}
            </div>
          )}

          <button type="button" onClick={triggerFileInput} className="admincreateproduct-upload-btn">
            Agregar imágenes
          </button>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            style={{ display: "none" }}
            onChange={handleImageChange}
          />

          <label>Nombre del producto:</label>
          <input
            type="text"
            placeholder="Ej. Candado de acero inoxidable"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />

          <label>Precio (MXN):</label>
          <input
            type="number"
            placeholder="Ej. 149.99"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            min={1}
          />

          <label>Stock disponible:</label>
          <input
            type="number"
            placeholder="Ej. 50"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            min={0}
          />

          <label>Marca:</label>
          <input
            type="text"
            placeholder="Ej. Yale, Phillips"
            value={marca}
            onChange={(e) => setMarca(e.target.value)}
          />

          <label>Descripción:</label>
          <textarea
            placeholder="Ej. Candado resistente al agua, ideal para exteriores, incluye 2 llaves"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            maxLength={500}
          />

          <label>Características:</label>
          <textarea
            placeholder="Ej. Cuerpo metálico, acero inoxidable, arco templado"
            value={caracteristicas}
            onChange={(e) => setCaracteristicas(e.target.value)}
            maxLength={500}
          />

          <label>Categoría:</label>
          <input
            type="text"
            placeholder="Ej. Candados, Cerraduras, Jaladeras"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
          />

          <label>Etiqueta:</label>
          <input
            type="text"
            placeholder="Ej. Oferta, Más vendidos, Nuevo"
            value={etiqueta}
            onChange={(e) => setEtiqueta(e.target.value)}
          />

          <label>Tipo:</label>
          <input
            type="text"
            placeholder="Ej. Digital, Magnético, de Llave"
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
          />

          <label>Material:</label>
          <input
            type="text"
            placeholder="Ej. Acero inoxidable, Aluminio"
            value={material}
            onChange={(e) => setMaterial(e.target.value)}
          />

          <label>Color o acabado:</label>
          <input
            type="text"
            placeholder="Ej. Cromado, Negro mate, Blanco"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />

          <button type="submit">Guardar producto</button>
        </form>
      </div>
    </div>
  );
};

export default Admincreateproduct;

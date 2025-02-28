import React, { useEffect, useState, useCallback } from "react";
import Navbar from "../components/Navbar";
import { UserProfile } from "../interfaces/UserProfile";
import "../styles/Profile.css";
import NotificationContainer from "../components/NotificationContainer";
import {countryCodes} from "../interfaces/countryCodes";
import Footer from "../components/Footer";


const Profile: React.FC = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editSection, setEditSection] = useState<"personal" | "password" | null>(null);
  const [editData, setEditData] = useState<UserProfile | null>(null);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [notifications, setNotifications] = useState<{ id: number; message: string; type: "success" | "error" | "info" | "warning" }[]>([]);

  const addNotification = useCallback((message: string, type: "success" | "error" | "info" | "warning") => {
    const newNotification = { id: Date.now(), message, type };
    setNotifications((prev) => [...prev, newNotification]);

    setTimeout(() => {
      removeNotification(newNotification.id);
    }, 5000);
  }, []);

  const removeNotification = (id: number) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const storedUserId = localStorage.getItem("userId");
        if (!storedUserId) {
          addNotification("No se encontró el ID del usuario.", "error");
          return;
        }

        const response = await fetch(`https://localhost:7130/api/perfil/${storedUserId}`);
        if (!response.ok) {
          throw new Error("Error al obtener los datos del usuario.");
        }

        const data: UserProfile = await response.json();
        setUser({ ...data, ID_Usuario: Number(storedUserId) });
      } catch {
        addNotification("Error al obtener los datos del usuario.", "error");
      }
    };

    fetchUserProfile();
  }, [addNotification]);

  const handleEditClick = (section: "personal" | "password") => {
    if (!user) return;
    setEditSection(section);
    setEditData({
      ...user,
      ID_Usuario: user.ID_Usuario || Number(localStorage.getItem("userId")) || 0,
      fechaNacimiento: user.fechaNacimiento ? user.fechaNacimiento.split("T")[0] : "",
    });
    setIsModalOpen(true);
    setOldPassword("");
    setNewPassword("");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!editData) return;
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (!editData || !user) return;

    if (
      editData.nombre === user.nombre &&
      editData.fechaNacimiento === user.fechaNacimiento?.split("T")[0] &&
      editData.telefono === user.telefono
    ) {
      addNotification("No hay cambios para actualizar.", "warning");
      return;
    }

    const storedUserId = localStorage.getItem("userId");
    if (!storedUserId) {
      addNotification("No se encontró el ID del usuario.", "error");
      return;
    }

    const formattedFechaNacimiento = editData.fechaNacimiento ? editData.fechaNacimiento.split("T")[0] : null;

    const payload = {
      ID_Usuario: Number(editData.ID_Usuario) || Number(storedUserId),
      nombre: editData.nombre || "",
      fechaNacimiento: formattedFechaNacimiento,
      correoElectronico: editData.correoElectronico || user.correoElectronico || "",
      telefono: editData.telefono || user.telefono || "",
    };

    try {
      const response = await fetch(`https://localhost:7130/api/perfil/${storedUserId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const responseData = await response.json();

      if (!response.ok) {
        addNotification(responseData.message || "Error al actualizar el perfil.", "error");
        return;
      }

      setUser({ ...user, ...payload });
      addNotification("Perfil actualizado correctamente.", "success");
      setIsModalOpen(false);
    } catch {
      addNotification("Ocurrió un error al actualizar el perfil.", "error");
    }
  };

  return (
    <div className="login">
      <NotificationContainer notifications={notifications} removeNotification={removeNotification} />
  
      <Navbar />
      <div className="profile-container">
        <div className="profile-section">
          <div className="profile-header">
            <h2>Datos personales</h2>
            <button className="profile-edit-button" onClick={() => handleEditClick("personal")}>
              Editar
            </button>
          </div>
          {user ? (
            <div className="profile-info">
              <p>
                <strong>Nombre completo:</strong> {user.nombre}
              </p>
              <p>
                <strong>Fecha de nacimiento:</strong> {user.fechaNacimiento ? user.fechaNacimiento.split("T")[0] : "Fecha no disponible"}
              </p>
              <p>
                <strong>Número de teléfono:</strong> {user.telefono}
              </p>
            </div>
          ) : (
            <p>Cargando datos...</p>
          )}
        </div>
  
        <div className="profile-section">
          <div className="profile-header">
            <h2>Datos usuario</h2>
            <button className="profile-edit-button" onClick={() => handleEditClick("password")}>
              Cambiar Contraseña
            </button>
          </div>
          {user ? (
            <div className="profile-info">
              <p>
                <strong>Correo electrónico:</strong> {user.correoElectronico}
              </p>
              <p>
                <strong>Contraseña:</strong> ********
              </p>
            </div>
          ) : (
            <p>Cargando datos...</p>
          )}
        </div>
      </div>
  
      {isModalOpen && (
        <div className="profile-modal">
          <div className="profile-modal-content">
            <h3>{editSection === "personal" ? "Editar Datos Personales" : "Cambiar Contraseña"}</h3>
  
            {editSection === "personal" ? (
              <>
                <label className="login__label">Nombre completo:</label>
                <input
                  type="text"
                  name="nombre"
                  value={editData?.nombre}
                  onChange={(e) => {
                    const valor = e.target.value;
                    if (/^[a-zA-Z\s]*$/.test(valor) && valor.length <= 30) {
                      handleInputChange(e);
                    }
                  }}
                  placeholder="Ingresa tu nombre completo..."
                  className="login__input"
                />
  
                <label className="login__label">Fecha de nacimiento:</label>
                <input
                  type="date"
                  name="fechaNacimiento"
                  value={editData?.fechaNacimiento ?? ""}
                  onChange={handleInputChange}
                  className="login__input"
                  min="1900-01-01"
                  max={new Date().toISOString().split("T")[0]}
                />
  
                <label className="login__label">Número de teléfono:</label>
                <div className="phone-input-container">
                  <select
                    className="phone-prefix"
                    value={editData?.telefono.split(" ")[0] || ""}
                    onChange={(e) =>
                      setEditData({ ...editData!, telefono: `${e.target.value} ${editData?.telefono.split(" ")[1] || ""}` })
                    }
                  >
                    {countryCodes.map((country) => (
                      <option key={country.code} value={country.code}>
                        {country.code}
                      </option>
                    ))}
                  </select>
  
                  <input
                    type="tel"
                    name="telefono"
                    value={editData?.telefono.split(" ")[1] || ""}
                    onChange={(e) => {
                      const valor = e.target.value;
                      if (/^\d*$/.test(valor) && valor.length <= 10) {
                        setEditData({ ...editData!, telefono: `${editData?.telefono.split(" ")[0] || ""} ${valor}` });
                      }
                    }}
                    placeholder="Ingresa tu número telefónico..."
                    className="login__input phone-number"
                  />
                </div>
              </>
            ) : (
              <>
                <label className="login__label">Contraseña actual:</label>
                <input
                  type="password"
                  name="oldPassword"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  placeholder="Ingresa tu contraseña actual..."
                  className="login__input"
                />
  
                <label className="login__label">Nueva contraseña:</label>
                <input
                  type="password"
                  name="newPassword"
                  value={newPassword}
                  onChange={(e) => {
                    const valor = e.target.value;
                    if (valor.length <= 20) {
                      setNewPassword(valor);
                    }
                  }}
                  placeholder="Ingresa tu nueva contraseña..."
                  className="login__input"
                />
              </>
            )}
  
            <button className="login__button" onClick={handleSave}>
              Guardar
            </button>
            <button className="login__button login__button-cancel" onClick={() => setIsModalOpen(false)}>
              Cancelar
            </button>
          </div>
        </div>
      )}
            <Footer />
    </div>
  );
}  

export default Profile;

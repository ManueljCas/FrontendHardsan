import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { UserProfile } from "../interfaces/UserProfile";
import "../styles/Profile.css";

const Profile: React.FC = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editSection, setEditSection] = useState<"personal" | "password" | null>(null);
  const [editData, setEditData] = useState<UserProfile | null>(null);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const storedUserId = localStorage.getItem("userId");
        if (!storedUserId) {
          console.error("❌ No hay ID de usuario en localStorage");
          return;
        }

        const response = await fetch(`https://localhost:7130/api/perfil/${storedUserId}`);

        if (!response.ok) {
          throw new Error("Error al obtener los datos del usuario");
        }

        const data: UserProfile = await response.json();
        console.log("✅ Datos recibidos:", data);

        setUser({ ...data, ID_Usuario: Number(storedUserId) });
      } catch (error) {
        console.error("⚠️ Error en fetchUserProfile:", error);
      }
    };

    fetchUserProfile();
  }, []);

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
    setErrorMessage("");
    setSuccessMessage("");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!editData) return;
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (!editData) return;

    const storedUserId = localStorage.getItem("userId");
    if (!storedUserId) {
      setErrorMessage("No se encontró el ID del usuario.");
      return;
    }

    // ✅ Aseguramos que `FechaNacimiento` tenga el formato correcto "YYYY-MM-DD"
    const formattedFechaNacimiento = editData.fechaNacimiento
  ? editData.fechaNacimiento.split("T")[0] // Solo deja YYYY-MM-DD
  : null;

    // ✅ Creamos el objeto con los datos a enviar
    const payload = {
      ID_Usuario: Number(editData.ID_Usuario) || Number(storedUserId),
      nombre: editData.nombre || "",
      fechaNacimiento: formattedFechaNacimiento,
      correoElectronico: editData.correoElectronico || user?.correoElectronico || "",
      telefono: editData.telefono || user?.telefono || "",
    };

    console.log("📤 Enviando datos al backend:", payload);

    try {
      const response = await fetch(`https://localhost:7130/api/perfil/${storedUserId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const responseData = await response.json();

      if (!response.ok) {
        console.error("❌ Respuesta del servidor:", responseData);
        throw new Error(responseData.mensaje || "Error al actualizar el perfil");
      }

      // ✅ Actualizamos el estado solo con los datos actualizados
      setUser({
        ...user,
        ...payload,
      });

      setSuccessMessage("✅ Perfil actualizado correctamente.");
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error al actualizar el perfil:", error);
      setErrorMessage("⚠️ Ocurrió un error al actualizar el perfil.");
    }
  };

  return (
    <>
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
                <label>Nombre completo:</label>
                <input type="text" name="nombre" value={editData?.nombre} onChange={handleInputChange} />

                <label>Fecha de nacimiento:</label>
                <input type="date" name="fechaNacimiento" value={editData?.fechaNacimiento ?? ""} onChange={handleInputChange} />

                <label>Número de teléfono:</label>
                <input type="text" name="telefono" value={editData?.telefono} onChange={handleInputChange} />
              </>
            ) : (
              <>
                <label>Contraseña actual:</label>
                <input type="password" name="oldPassword" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />

                <label>Nueva contraseña:</label>
                <input type="password" name="newPassword" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />

                {errorMessage && <p className="error-message">{errorMessage}</p>}
                {successMessage && <p className="success-message">{successMessage}</p>}
              </>
            )}

            <button className="profile-button" onClick={handleSave}>
              Guardar
            </button>
            <button className="profile-button profile-button-cancel" onClick={() => setIsModalOpen(false)}>
              Cancelar
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;

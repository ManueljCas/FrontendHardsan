import React, { useEffect, useState } from "react";
import Image from "next/image"; // ✅ Importamos Image de next/image
import "../styles/Notification.css"; // Importa los estilos
import { NotificationProps } from "../interfaces/NotificationInterface";

// Importar imágenes de los iconos
import successIcon from "../IMG/success.png";
import errorIcon from "../IMG/error.png";
import infoIcon from "../IMG/info.png";
import warningIcon from "../IMG/warning.png";

// Mapeo de iconos según el tipo de notificación
const iconMap = {
  success: successIcon,
  error: errorIcon,
  info: infoIcon,
  warning: warningIcon,
};

const Notification: React.FC<NotificationProps> = ({ id, message, type = "info", onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false); // Activa la animación de salida
      setTimeout(() => {
        onClose(id); // Elimina la notificación después de la animación
      }, 400); // Tiempo exacto de la animación de salida (coincide con el CSS)
    }, 5000); // La notificación dura 5 segundos antes de iniciar la salida

    return () => clearTimeout(timer);
  }, [id, onClose]);

  return (
    <div className={`notification ${type} ${isVisible ? "fade-in" : "fade-out"}`}>
      <div className="notification-content">
        {/* ✅ Ahora usamos `Image` de Next.js */}
        <Image src={iconMap[type]} alt={type} className="notification-icon" width={24} height={24} />
        <div>
          <strong className="notification-title">{message}</strong>
        </div>
      </div>
      <button className="close-btn" onClick={() => setIsVisible(false)}>✖</button>
    </div>
  );
};

export default Notification;

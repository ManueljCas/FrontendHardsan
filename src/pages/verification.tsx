import React, { useState } from "react";
import { useRouter } from "next/router";
import NotificationContainer from "../components/NotificationContainer";
import { NotificationType } from "../interfaces/NotificationInterface";
import "../styles/Login.css";

const Verification: React.FC = () => {
  const [codigo, setCodigo] = useState("");
  const router = useRouter();
  const email = router.query.email as string;
  const [notifications, setNotifications] = useState<NotificationType[]>([]);

  const addNotification = (message: string, type: "success" | "error" | "info" | "warning") => {
    const newNotification: NotificationType = { id: Date.now(), message, type };
    setNotifications((prev) => [...prev, newNotification]);

    setTimeout(() => {
      removeNotification(newNotification.id);
    }, 5000);
  };

  const removeNotification = (id: number) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const handleVerification = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!codigo.trim()) {
      addNotification("Por favor, ingresa el código de verificación.", "warning");
      return;
    }

    try {
      const response = await fetch("https://localhost:7130/api/Usuario/VerifyCode", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, code: codigo }),
      });

      const result = await response.json();

      if (!response.ok) {
        addNotification(result.message || "El código es inválido o ha expirado.", "error");
        return;
      }

      addNotification("¡Verificación exitosa! Redirigiendo...", "success");

      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch {
      addNotification("Hubo un error al verificar el código.", "error");
    }
  };

  return (
    <div className="login">
      <NotificationContainer notifications={notifications} removeNotification={removeNotification} />
      <div className="login__container">
        <h1 className="login__titulo">Verificación</h1>
        <p className="login__text">Ingresa el código de verificación enviado a tu correo.</p>
        <form className="login__form" onSubmit={handleVerification}>
          <label className="login__label" htmlFor="codigo">Código de Verificación</label>
          <input
            id="codigo"
            type="text"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
            placeholder="Ingresa tu código..."
            className="login__input"
            required
          />
          <button type="submit" className="login__button">Verificar</button>
        </form>
      </div>
    </div>
  );
};

export default Verification;

import React, { useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../context/AuthContext";
import NotificationContainer from "../components/NotificationContainer"; 
import { NotificationType } from "../interfaces/NotificationInterface"; 
import Image from "next/image"; // ✅ Importar Image de Next.js
import LogoHardsan from "../IMG/LogoHardsan.png"; // ✅ Importar el logo
import "../styles/Login.css";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { login } = useAuth();
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

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!email || !password) {
      addNotification("Por favor, completa todos los campos.", "warning");
      return;
    }

    const loginData = { email, password };

    try {
      const response = await fetch("https://localhost:7130/api/Usuario/Login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      if (!response.ok) {
        throw new Error("Error al iniciar sesión. Verifica tus credenciales.");
      }

      const data = await response.json();

      login({
        id: data.userId,
        name: data.userName,
        role: data.role,
        token: data.token,
      });

      addNotification("Inicio de sesión exitoso. Redirigiendo...", "success");

      setTimeout(() => {
        router.push("/start");
      }, 1500);
    } catch (error: unknown) {
      let errorMessage = "Hubo un error al intentar iniciar sesión.";

      if (error instanceof Error) {
        errorMessage = error.message;
      }

      addNotification(errorMessage, "error");
    }
  };

  return (
    <div className="login">
      <NotificationContainer notifications={notifications} removeNotification={removeNotification} />
      <div className="login__container">
        {/* ✅ Agregamos el logo arriba del formulario */}
        <div className="login__logo">
          <Image src={LogoHardsan} alt="Hardsan Logo" width={180} height={60} priority />
        </div>
        
        <p className="login__text">
          Ingresa tus datos para acceder a tu cuenta y disfrutar de nuestros servicios.
        </p>
        
        <form className="login__form" onSubmit={handleLogin}>
          <label htmlFor="email" className="login__label">Correo Electrónico</label>
          <input
            id="email"
            type="email"
            className="login__input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Ingresa tu correo electrónico..."
            required
          />
          
          <label htmlFor="password" className="login__label">Contraseña</label>
          <input
            id="password"
            type="password"
            className="login__input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Ingresa tu contraseña..."
            required
          />
          
          <button type="submit" className="login__button">Iniciar sesión</button>
        </form>
        
        <p className="login__register">
          ¿Aún no tienes una cuenta? <a href="register" className="login__link">Regístrate aquí</a>
        </p>
      </div>
    </div>
  );
};

export default Login;

import React, { useState } from "react";
import { useRouter } from "next/router";
import "../styles/Login.css";
import NotificationContainer from "../components/NotificationContainer";
import { NotificationType } from "../interfaces/NotificationInterface";
import {countryCodes} from "../interfaces/countryCodes"

const Register: React.FC = () => {
  const [nombre, setNombre] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [telefono, setTelefono] = useState("");
  const [correoElectronico, setCorreoElectronico] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<{ name: string; code: string } | null>(null);
  const router = useRouter();
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

  const validarFormulario = () => {
    if (!nombre.trim()) {
      addNotification("El nombre es obligatorio.", "warning");
      return false;
    }

    if (!/^[a-zA-Z\s]+$/.test(nombre) || nombre.length < 3) {
      addNotification("El nombre debe tener al menos 3 caracteres y solo puede contener letras y espacios.", "warning");
      return false;
    }

    if (!fechaNacimiento) {
      addNotification("La fecha de nacimiento es obligatoria.", "warning");
      return false;
    }

    const fechaNac = new Date(fechaNacimiento);
    const hoy = new Date();
    let edad = hoy.getFullYear() - fechaNac.getFullYear();
    const mes = hoy.getMonth() - fechaNac.getMonth();
    if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNac.getDate())) {
      edad--;
    }
    if (edad < 18) {
      addNotification("Debes tener al menos 18 años para registrarte.", "error");
      return false;
    }

    if (!telefono.trim()) {
      addNotification("El número de teléfono es obligatorio.", "warning");
      return false;
    }

    if (!/^\d{10}$/.test(telefono)) {
      addNotification("El número de teléfono debe tener exactamente 10 dígitos.", "error");
      return false;
    }

    if (!correoElectronico.trim()) {
      addNotification("El correo electrónico es obligatorio.", "warning");
      return false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correoElectronico)) {
      addNotification("Por favor, ingresa un correo electrónico válido.", "error");
      return false;
    }

    if (!contrasena) {
      addNotification("La contraseña es obligatoria.", "warning");
      return false;
    }

    if (
      contrasena.length < 8 ||
      !/[A-Z]/.test(contrasena) ||
      !/[a-z]/.test(contrasena) ||
      !/[0-9]/.test(contrasena) ||
      !/[!@#$%^&*(),.?":{}|<>]/.test(contrasena)
    ) {
      addNotification("La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial.", "error");
      return false;
    }

    return true;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!validarFormulario()) return;

    const usuarioData = {
      nombre,
      fechaNacimiento,
      telefono: `${selectedCountry?.code} ${telefono}`,
      correoElectronico,
      contrasena,
      rol: "Cliente",
      estado: "Pendiente",
    };

    console.log("Datos enviados al backend:", usuarioData);

    try {
      const response = await fetch("https://localhost:7130/api/Usuario/Register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(usuarioData),
      });

      const responseData = await response.json();

      if (!response.ok) {
        if (responseData.message.includes("correo electrónico")) {
          addNotification(responseData.message, "error");
        } else if (responseData.message.includes("número de teléfono")) {
          addNotification(responseData.message, "error");
        } else {
          addNotification("Error al registrar usuario.", "error");
        }
        return;
      }

      addNotification("Registro exitoso. Redirigiendo...", "success");

      setTimeout(() => {
        router.push(`/verification?email=${correoElectronico}`);
      }, 1500);
    } catch (error: unknown) {
      let errorMessage = "Hubo un error al registrar el usuario.";
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
        <h1 className="login__titulo">Registro</h1>
        <p className="login__text">Complete los campos solicitados.</p>
  
        <form className="login__form" onSubmit={handleSubmit}>
          <label className="login__label" htmlFor="nombre">Nombre y apellido</label>
          <input
            id="nombre"
            type="text"
            value={nombre}
            onChange={(e) => {
              const valor = e.target.value;
              if (/^[a-zA-Z\s]*$/.test(valor) && valor.length <= 30) {
                setNombre(valor);
              }
            }}
            placeholder="Ingresa tu nombre completo..."
            className="login__input"
            required
          />
  
          <label className="login__label" htmlFor="fechaNacimiento">Fecha de nacimiento</label>
          <input
            id="fechaNacimiento"
            type="date"
            value={fechaNacimiento}
            onChange={(e) => setFechaNacimiento(e.target.value)}
            className="login__input"
            required
            min="1900-01-01"
            max={new Date().toISOString().split("T")[0]}
          />
  
          <label className="login__label" htmlFor="telefono">Número de teléfono</label>
          <div className="phone-input-container">
            <select
              className="phone-prefix"
              value={selectedCountry?.code || ""}
              onChange={(e) => setSelectedCountry(countryCodes.find(c => c.code === e.target.value) || countryCodes[0])}
            >
              {countryCodes.map((country) => (
                <option key={country.code} value={country.code}>
                  {country.code}
                </option>
              ))}
            </select>
  
            <input
              id="telefono"
              type="tel"
              value={telefono}
              onChange={(e) => {
                const valor = e.target.value;
                if (/^\d*$/.test(valor) && valor.length <= 10) {
                  setTelefono(valor);
                }
              }}
              placeholder="Ingresa tu número telefónico..."
              className="login__input phone-number"
              required
            />
          </div>
  
          <label className="login__label" htmlFor="correoElectronico">Correo Electrónico</label>
          <input
            id="correoElectronico"
            type="email"
            value={correoElectronico}
            onChange={(e) => {
              const valor = e.target.value;
              if (valor.length <= 50) {
                setCorreoElectronico(valor);
              }
            }}
            placeholder="Ingresa tu correo electrónico..."
            className="login__input"
            required
          />
  
          <label className="login__label" htmlFor="contrasena">Contraseña</label>
          <input
            id="contrasena"
            type="password"
            value={contrasena}
            onChange={(e) => {
              const valor = e.target.value;
              if (valor.length <= 20) {
                setContrasena(valor);
              }
            }}
            placeholder="Ingresa tu contraseña..."
            className="login__input"
            required
          />
  
          <button type="submit" className="login__button">
            Registrarse
          </button>
        </form>
  
        <p className="login__register">
          ¿Ya tienes una cuenta?{" "}
          <a href="login" className="login__link">
            Inicia sesión aquí
          </a>
        </p>
      </div>
    </div>
  );
  
  
  
  
}

export default Register;
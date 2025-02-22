import React, { useState } from "react";
import { useRouter } from "next/router";
import "../styles/Login.css";
import NotificationContainer from "../components/NotificationContainer"; // ✅ Importar el manejador de notificaciones
import { NotificationType } from "../interfaces/NotificationInterface"; // ✅ Importar la interfaz


// Lista de países con sus códigos de país
const countryCodes = [
  { name: "China", code: "+86" },
  { name: "India", code: "+91" },
  { name: "Estados Unidos", code: "+1" },
  { name: "Indonesia", code: "+62" },
  { name: "Brasil", code: "+55" },
  { name: "Rusia", code: "+7" },
  { name: "Japón", code: "+81" },
  { name: "México", code: "+52" },
  { name: "Vietnam", code: "+84" },
  { name: "Alemania", code: "+49" },
  { name: "Filipinas", code: "+63" },
  { name: "Nigeria", code: "+234" },
  { name: "Turquía", code: "+90" },
  { name: "Reino Unido", code: "+44" },
  { name: "Francia", code: "+33" },
  { name: "Tailandia", code: "+66" },
  { name: "Italia", code: "+39" },
  { name: "Egipto", code: "+20" },
  { name: "Bangladés", code: "+880" },
  { name: "Pakistán", code: "+92" },
  { name: "Irán", code: "+98" },
  { name: "Corea del Sur", code: "+82" },
  { name: "Argentina", code: "+54" },
  { name: "Sudáfrica", code: "+27" },
  { name: "Ucrania", code: "+380" },
  { name: "España", code: "+34" },
  { name: "Colombia", code: "+57" },
  { name: "Polonia", code: "+48" },
  { name: "Malasia", code: "+60" },
  { name: "Arabia Saudita", code: "+966" },
  { name: "Uzbekistán", code: "+998" },
  { name: "Perú", code: "+51" },
  { name: "Venezuela", code: "+58" },
  { name: "Chile", code: "+56" },
  { name: "Australia", code: "+61" },
  { name: "Rumania", code: "+40" },
  { name: "Países Bajos", code: "+31" },
  { name: "Nepal", code: "+977" },
  { name: "Afganistán", code: "+93" },
  { name: "Ghana", code: "+233" },
  { name: "Mozambique", code: "+258" },
  { name: "Yemen", code: "+967" },
  { name: "Corea del Norte", code: "+850" },
  { name: "Taiwán", code: "+886" },
  { name: "Sri Lanka", code: "+94" },
  { name: "Camerún", code: "+237" },
  { name: "Angola", code: "+244" },
];

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
      {/* 📢 Contenedor de Notificaciones */}
      <NotificationContainer notifications={notifications} removeNotification={removeNotification} />
  
      <div className="login__container">
        <h1 className="login__titulo">Registro</h1>
        <p className="login__text">Complete los campos solicitados.</p>
  
        <form className="login__form" onSubmit={handleSubmit}>
          {/* 🔹 Nombre y Apellido */}
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
  
          {/* 🔹 Fecha de Nacimiento */}
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
  
          {/* 🔹 Número de Teléfono */}
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
  
          {/* 🔹 Correo Electrónico */}
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
  
          {/* 🔹 Contraseña */}
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
  
          {/* 🔹 Botón de Registro */}
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
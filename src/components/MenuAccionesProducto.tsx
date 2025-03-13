// components/MenuAccionesProducto.tsx
import React from "react";
import { useRouter } from "next/router";
import "../styles/Adminproducts.css";

interface MenuProps {
  isOpen: boolean;
  onToggle: (e: React.MouseEvent) => void;
  nombre: string;
}

const MenuAccionesProducto: React.FC<MenuProps> = ({
  isOpen,
  onToggle,
  nombre,
}) => {
  const router = useRouter();

  return (
    <div>
      <button className="adminproducts-menu-toggle" onClick={onToggle}>
        ⋮
      </button>

      {isOpen && (
        <div className="adminproducts-menu">
          <button onClick={() => alert(`Eliminar ${nombre}`)}>Eliminar</button>
          <button onClick={() => router.push("/QWRtaW5wcm9kdWN0")}>Editar</button>
          <button onClick={() => alert(`Detalles de ${nombre}`)}>Detalles</button>
        </div>
      )}
    </div>
  );
};

export default MenuAccionesProducto;

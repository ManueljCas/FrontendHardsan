import React, { useEffect, useState } from "react";
import Image from "next/image"; 
import "../styles/Notification.css"; 
import { NotificationProps } from "../interfaces/NotificationInterface";
import successIcon from "../IMG/success.png";
import errorIcon from "../IMG/error.png";
import infoIcon from "../IMG/info.png";
import warningIcon from "../IMG/warning.png";

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
      setIsVisible(false);
      setTimeout(() => {
        onClose(id);
      }, 400); 
    }, 5000);

    return () => clearTimeout(timer);
  }, [id, onClose]);

  return (
    <div className={`notification ${type} ${isVisible ? "fade-in" : "fade-out"}`}>
      <div className="notification-content">
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

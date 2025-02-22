import React from "react";
import Notification from "./Notifications";
import { NotificationType } from "../interfaces/NotificationInterface";
import "../styles/Notification.css"; // Importa los estilos

interface NotificationContainerProps {
  notifications: NotificationType[];
  removeNotification: (id: number) => void;
}

const NotificationContainer: React.FC<NotificationContainerProps> = ({ notifications, removeNotification }) => {
  return (
    <div className="notification-container">
      {notifications.map((notification) => (
        <Notification key={notification.id} {...notification} onClose={() => removeNotification(notification.id)} />
      ))}
    </div>
  );
};

export default NotificationContainer;

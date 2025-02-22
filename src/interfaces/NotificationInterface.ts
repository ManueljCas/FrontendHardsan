export interface NotificationType {
    id: number;
    message: string;
    type: "success" | "error" | "info" | "warning";
  }
  

export  interface NotificationProps {
    id: number;
    message: string;
    type?: "success" | "error" | "info" | "warning";
    onClose: (id: number) => void;
  }
  
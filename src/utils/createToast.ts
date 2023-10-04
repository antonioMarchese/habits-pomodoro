import EventManager from "../lib/eventManager";

export const toastEventManager = new EventManager();

export interface ToastCreationProps {
  type: "default" | "danger" | "success";
  message: string;
}

export default function CreateToast({ type, message }: ToastCreationProps) {
  toastEventManager.emit("addtoast", {
    type,
    message,
  });
}

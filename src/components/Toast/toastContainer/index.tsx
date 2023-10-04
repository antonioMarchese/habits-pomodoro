import { useCallback, useEffect, useState } from "react";
import ToastMessage from "../toastMessage";
import { Container } from "./styles";
import { toastEventManager } from "../../../utils/createToast";

export interface ToastProps {
  id: number;
  message: string;
  type?: "default" | "danger" | "success";
}

export default function ToastContainer() {
  const [messages, setMessages] = useState<ToastProps[]>([]);

  const handleRemoveMessage = useCallback((id: number) => {
    setMessages((prevState) => prevState.filter((toast) => toast.id !== id));
  }, []);

  useEffect(() => {
    function handleAddToast({
      type,
      message,
    }: {
      type: "default" | "danger" | "success";
      message: string;
    }) {
      setMessages((prevState) => [
        ...prevState,
        {
          id: Math.random(),
          type,
          message,
        },
      ]);
    }

    toastEventManager.on("addtoast", handleAddToast);

    // Sempre que adicionarmos um eventListener é preciso removê-lo na cleanup function do useEffect
    return () => {
      toastEventManager.removeListener("addtoast", handleAddToast);
    };
  }, []);

  return (
    <Container>
      {messages.map((toast) => (
        <ToastMessage
          message={toast.message}
          type={toast.type}
          onRemoveMessage={handleRemoveMessage}
          id={toast.id}
          key={toast.id}
        />
      ))}
    </Container>
  );
}

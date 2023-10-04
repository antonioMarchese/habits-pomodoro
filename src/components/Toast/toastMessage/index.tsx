import { Container, TopBar } from "./styles";
import { CheckCircle, WarningCircle } from "phosphor-react";
import { useEffect, useState } from "react";

export default function ToastMessage({
  id,
  message,
  type = "default",
  onRemoveMessage,
}: {
  id: number;
  message: string;
  type?: "default" | "danger" | "success";
  onRemoveMessage: (id: number) => void;
}) {
  const [animation, setAnimation] = useState<"appearing" | "hiding">(
    "appearing"
  );

  function handleRemoveToast() {
    setAnimation("hiding");
    setTimeout(() => onRemoveMessage(id), 250);
  }

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      handleRemoveToast();
    }, 3500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [onRemoveMessage, id]);

  return (
    <Container
      tabIndex={0}
      type={type}
      onClick={handleRemoveToast}
      animation={animation}
    >
      <TopBar />
      {type === "danger" && <WarningCircle size={24} />}
      {type === "success" && <CheckCircle size={24} />}
      <strong>{message}</strong>
    </Container>
  );
}

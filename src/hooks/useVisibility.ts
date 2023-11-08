import { useState, useEffect, useCallback } from "react";

export const useVisbilityState = () => {
  const [visibilityState, setVisibilityState] = useState<
    "hidden" | "visible" | null
  >(null);

  const handleVisbilityChange = useCallback(() => {
    setVisibilityState(document.visibilityState);
  }, [setVisibilityState]);

  useEffect(() => {
    document.addEventListener("visibilitychange", handleVisbilityChange);
    return () =>
      document.removeEventListener("visibilitychange", handleVisbilityChange);
  }, [handleVisbilityChange]);

  return { visibilityState };
};

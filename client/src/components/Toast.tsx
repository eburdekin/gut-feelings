// src/components/Toast.tsx

import { useEffect } from "react";

type ToastProps = {
  message: string;
  type: "SUCCESS" | "ERROR";
  onClose: () => void;
};

const Toast = ({ message, type, onClose }: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [onClose]);

  const toastColor = type === "SUCCESS" ? "green" : "red";

  return (
    <div color={`${toastColor}`}>
      <div>
        <span>{message}</span>
      </div>
    </div>
  );
};

export default Toast;

import { createContext } from "react";
import type { ToastType } from "../types/toast";

export interface ToastContextValue {
  showToast: (message: string, type?: ToastType) => void;
  hideToast: (id: string) => void;
}

export const ToastContext = createContext<ToastContextValue | undefined>(
  undefined,
);

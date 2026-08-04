import { FiAlertCircle, FiCheckCircle, FiInfo, FiX } from "react-icons/fi";
import type { ToastData } from "../../types/toast";

interface ToastProps {
  toast: ToastData;
  onClose: (id: string) => void;
}

function Toast({ toast, onClose }: ToastProps) {
  const config = {
    success: {
      icon: FiCheckCircle,
      containerClass: "border-emerald-200 bg-emerald-50 text-emerald-800",
      iconClass: "text-emerald-600",
    },
    error: {
      icon: FiAlertCircle,
      containerClass: "border-red-200 bg-red-50 text-red-800",
      iconClass: "text-red-600",
    },
    info: {
      icon: FiInfo,
      containerClass: "border-blue-200 bg-blue-50 text-blue-800",
      iconClass: "text-blue-600",
    },
  }[toast.type];

  const Icon = config.icon;

  return (
    <div
      role="status"
      className={`flex w-full items-start gap-3 rounded-xl border px-4 py-3 shadow-lg ${config.containerClass}`}
    >
      <Icon
        aria-hidden="true"
        className={`mt-0.5 shrink-0 text-lg ${config.iconClass}`}
      />

      <p className="flex-1 text-sm font-medium leading-5">{toast.message}</p>

      <button
        type="button"
        onClick={() => onClose(toast.id)}
        aria-label="Close notification"
        className="shrink-0 rounded-md p-1 opacity-60 transition hover:bg-black/5 hover:opacity-100"
      >
        <FiX aria-hidden="true" />
      </button>
    </div>
  );
}

export default Toast;

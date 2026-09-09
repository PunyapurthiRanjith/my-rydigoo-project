import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  XCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { getToasts, subscribeToasts, toast, TOAST_TYPES } from "../services/toastService";

const TYPE_STYLES = {
  [TOAST_TYPES.success]: {
    bar: "bg-green-500",
    icon: CheckCircleIcon,
    ring: "ring-green-100",
  },
  [TOAST_TYPES.error]: {
    bar: "bg-red-500",
    icon: XCircleIcon,
    ring: "ring-red-100",
  },
  [TOAST_TYPES.warning]: {
    bar: "bg-amber-500",
    icon: ExclamationTriangleIcon,
    ring: "ring-amber-100",
  },
  [TOAST_TYPES.info]: {
    bar: "bg-teal-500",
    icon: InformationCircleIcon,
    ring: "ring-teal-100",
  },
};

const ToastItem = ({ item, onDismiss }) => {
  const config = TYPE_STYLES[item.type] || TYPE_STYLES[TOAST_TYPES.info];
  const Icon = config.icon;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -20, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -12, scale: 0.96 }}
      transition={{ type: "spring", damping: 26, stiffness: 340 }}
      className={`pointer-events-auto flex w-full max-w-sm items-start gap-3 overflow-hidden rounded-2xl bg-white p-4 shadow-xl ring-1 ${config.ring}`}
      role="status"
      aria-live="polite"
    >
      <div className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${config.bar} text-white`}>
        <Icon className="h-5 w-5" />
      </div>
      <p className="min-w-0 flex-1 pt-1 text-sm font-medium text-gray-800">{item.message}</p>
      <button
        type="button"
        onClick={() => onDismiss(item.id)}
        className="shrink-0 rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
        aria-label="Dismiss notification"
      >
        <XMarkIcon className="h-4 w-4" />
      </button>
    </motion.div>
  );
};

const ToastProvider = ({ children }) => {
  const [items, setItems] = useState(getToasts);

  useEffect(() => subscribeToasts(() => setItems(getToasts())), []);

  return (
    <>
      {children}
      <div className="pointer-events-none fixed right-4 top-20 z-[300] flex w-full max-w-sm flex-col gap-2 sm:right-5">
        <AnimatePresence mode="popLayout">
          {items.map((item) => (
            <ToastItem key={item.id} item={item} onDismiss={toast.dismiss} />
          ))}
        </AnimatePresence>
      </div>
    </>
  );
};

export default ToastProvider;

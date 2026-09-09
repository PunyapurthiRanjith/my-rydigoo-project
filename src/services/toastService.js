const DEFAULT_DURATION = 3500;

let listeners = new Set();
let toastId = 0;

const notify = () => {
  listeners.forEach((listener) => listener());
};

export const TOAST_TYPES = {
  success: "success",
  error: "error",
  info: "info",
  warning: "warning",
};

const toasts = [];

export const getToasts = () => [...toasts];

export const subscribeToasts = (listener) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

const removeToast = (id) => {
  const index = toasts.findIndex((toast) => toast.id === id);
  if (index === -1) {
    return;
  }
  toasts.splice(index, 1);
  notify();
};

const addToast = ({ message, type = TOAST_TYPES.info, duration = DEFAULT_DURATION }) => {
  if (!message) {
    return null;
  }

  const id = ++toastId;
  const toast = {
    id,
    message,
    type,
    duration,
    createdAt: Date.now(),
  };

  toasts.push(toast);
  notify();

  if (duration > 0) {
    setTimeout(() => removeToast(id), duration);
  }

  return id;
};

export const toast = {
  show: (message, options = {}) => {
    if (typeof message === "object") {
      return addToast(message);
    }
    return addToast({ message, ...options });
  },

  success: (message, duration = DEFAULT_DURATION) =>
    addToast({ message, type: TOAST_TYPES.success, duration }),

  error: (message, duration = DEFAULT_DURATION) =>
    addToast({ message, type: TOAST_TYPES.error, duration }),

  info: (message, duration = DEFAULT_DURATION) =>
    addToast({ message, type: TOAST_TYPES.info, duration }),

  warning: (message, duration = DEFAULT_DURATION) =>
    addToast({ message, type: TOAST_TYPES.warning, duration }),

  dismiss: removeToast,
};

export default toast;

import { useEffect } from "react";
import styles from "./Toast.module.css";

export default function Toast({ toast, setToast }) {
  useEffect(() => {
    if (!toast) return undefined;

    const timer = window.setTimeout(() => {
      setToast(null);
    }, 3500);

    return () => window.clearTimeout(timer);
  }, [toast, setToast]);

  if (!toast) return null;

  return (
    <div
      className={`${styles.toast} ${
        toast.type === "error" ? styles.error : styles.success
      }`}
      role={toast.type === "error" ? "alert" : "status"}
      aria-live={toast.type === "error" ? "assertive" : "polite"}
    >
      <span>{toast.message}</span>

      <button
        type="button"
        className={styles.close}
        onClick={() => setToast(null)}
        aria-label="Dismiss notification"
      >
        ×
      </button>
    </div>
  );
}
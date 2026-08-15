import { useEffect } from "react";
import { createPortal } from "react-dom";
import styles from "./Modal.module.css";
import Button from "../Button/Button";

export default function Modal({ open, title, children, onClose }) {
  useEffect(() => {
    if (!open) return undefined;

    const onKey = (event) => {
      if (event.key === "Escape") onClose?.();
    };

    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div className={styles.overlay} role="presentation" onClick={onClose}>
      <div
        className={`glass-panel ${styles.dialog}`}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onClick={(event) => event.stopPropagation()}
      >
        <header className={styles.header}>
          <h2>{title}</h2>
          <Button variant="ghost" onClick={onClose} aria-label="Close modal">
            Close
          </Button>
        </header>
        <div className={styles.body}>{children}</div>
      </div>
    </div>,
    document.body
  );
}

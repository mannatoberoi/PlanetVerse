import { formatDate, statusLabel } from "../../utils/formatters";
import styles from "./AssignmentCard.module.css";

export default function AssignmentCard({ assignment }) {
  return (
    <article className={`glass-panel ${styles.card}`}>
      <header className={styles.header}>
        <h3>{assignment.title}</h3>
        <span
          className={`${styles.badge} ${
            assignment.status === "completed" ? styles.done : styles.pending
          }`}
        >
          {statusLabel(assignment.status)}
        </span>
      </header>
      <p className={styles.meta}>Due {formatDate(assignment.dueDate)}</p>
    </article>
  );
}

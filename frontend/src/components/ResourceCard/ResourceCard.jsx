import styles from "./ResourceCard.module.css";

export default function ResourceCard({ resource }) {
  return (
    <article className={`glass-panel ${styles.card}`}>
      <p className={styles.type}>{resource.type}</p>
      <h3 className={styles.title}>{resource.title}</h3>
      <a className={styles.link} href={resource.url}>
        Open resource
      </a>
    </article>
  );
}

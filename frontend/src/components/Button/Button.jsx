import styles from "./Button.module.css";

export default function Button({
  children,
  variant = "primary",
  type = "button",
  className = "",
  ...props
}) {
  const classes = [styles.button, styles[variant], className]
    .filter(Boolean)
    .join(" ");

  return (
    <button type={type} className={classes} {...props}>
      {children}
    </button>
  );
}

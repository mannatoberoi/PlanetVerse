import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import { APP_NAME, ROUTES } from "../../utils/constants";
import styles from "./LoginPage.module.css";

export default function LoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Visual prototype only — auth + MySQL come later.
    navigate(ROUTES.dashboard);
  };

  return (
    <section className={styles.page}>
      <form className={`glass-panel ${styles.card}`} onSubmit={handleSubmit}>
        <p className={styles.eyebrow}>{APP_NAME}</p>
        <h1>Pilot Login</h1>
        <p className={styles.note}>
          UI prototype — credentials are not verified yet. Submit to enter the
          dashboard.
        </p>

        <label className={styles.field}>
          <span>Email</span>
          <input
            type="email"
            name="email"
            autoComplete="email"
            placeholder="you@college.edu"
            value={form.email}
            onChange={handleChange}
            required
          />
        </label>

        <label className={styles.field}>
          <span>Password</span>
          <input
            type="password"
            name="password"
            autoComplete="current-password"
            placeholder="••••••••"
            value={form.password}
            onChange={handleChange}
            required
          />
        </label>

        <Button type="submit" className={styles.submit}>
          Launch Session
        </Button>

        <p className={styles.footer}>
          <Link to={ROUTES.home}>Return to orbit</Link>
        </p>
      </form>
    </section>
  );
}

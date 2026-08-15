import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import { APP_NAME, ROUTES } from "../../utils/constants";
import styles from "./LoginPage.module.css";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function LoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validate = (values) => {
    const next = {};

    if (!values.email.trim()) {
      next.email = "Email is required.";
    } else if (!EMAIL_PATTERN.test(values.email.trim())) {
      next.email = "Enter a valid email address (example@college.edu).";
    }

    if (!values.password) {
      next.password = "Password is required.";
    } else if (values.password.length < 6) {
      next.password = "Password must be at least 6 characters.";
    }

    return next;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    const nextForm = { ...form, [name]: value };
    setForm(nextForm);
    if (touched[name]) {
      setErrors(validate(nextForm));
    }
  };

  const handleBlur = (event) => {
    const { name } = event.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors(validate(form));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = validate(form);
    setErrors(nextErrors);
    setTouched({ email: true, password: true });

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    // Client-side validation only in this phase — no password storage / auth yet.
    navigate(ROUTES.dashboard);
  };

  return (
    <section className={styles.page}>
      <form className={`glass-panel ${styles.card}`} onSubmit={handleSubmit} noValidate>
        <p className={styles.eyebrow}>{APP_NAME}</p>
        <h1>Pilot Login</h1>
        <p className={styles.note}>
          JavaScript validates email format and required fields. Full database
          authentication comes in a later phase — passwords are not checked or
          stored here.
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
            onBlur={handleBlur}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
          {errors.email && (
            <span id="email-error" className={styles.error}>
              {errors.email}
            </span>
          )}
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
            onBlur={handleBlur}
            aria-invalid={Boolean(errors.password)}
            aria-describedby={errors.password ? "password-error" : undefined}
          />
          {errors.password && (
            <span id="password-error" className={styles.error}>
              {errors.password}
            </span>
          )}
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

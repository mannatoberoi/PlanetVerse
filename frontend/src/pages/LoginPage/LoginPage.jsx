
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import { APP_NAME, ROUTES } from "../../utils/constants";
import { apiPost } from "../../services/api";
import { setSessionUser } from "../../utils/session";
import styles from "./LoginPage.module.css";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function LoginPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  const validate = (values) => {
    const next = {};

    if (!values.email.trim()) {
      next.email = "Email is required.";
    } else if (!EMAIL_PATTERN.test(values.email.trim())) {
      next.email = "Enter a valid email address.";
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

    const nextForm = {
      ...form,
      [name]: value,
    };

    setForm(nextForm);
    setServerError("");

    if (touched[name]) {
      setErrors(validate(nextForm));
    }
  };

  const handleBlur = (event) => {
    const { name } = event.target;

    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));

    setErrors(validate(form));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const nextErrors = validate(form);

    setErrors(nextErrors);
    setTouched({
      email: true,
      password: true,
    });
    setServerError("");

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setLoading(true);

    try {
      const response = await apiPost("/users/login", {
        email: form.email.trim(),
        password: form.password,
      });

      if (!response?.success || !response?.data?.user_id) {
        throw new Error("Login failed. Please try again.");
      }

      // Save the safe user object, never the password.
      setSessionUser(response.data);

      navigate(ROUTES.dashboard, { replace: true });
    } catch (error) {
      setServerError(
        error.message || "Unable to log in. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={styles.page}>
      <form
        className={`glass-panel ${styles.card}`}
        onSubmit={handleSubmit}
        noValidate
      >
        <p className={styles.eyebrow}>{APP_NAME}</p>

        <h1>Pilot Login</h1>

        <p className={styles.note}>
          Sign in with your PlanetVerse account to enter your learning
          universe.
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
            aria-describedby={
              errors.email ? "email-error" : undefined
            }
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
            placeholder="Enter your password"
            value={form.password}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={Boolean(errors.password)}
            aria-describedby={
              errors.password ? "password-error" : undefined
            }
          />

          {errors.password && (
            <span id="password-error" className={styles.error}>
              {errors.password}
            </span>
          )}
        </label>

        {serverError && (
          <p className={styles.error} role="alert">
            {serverError}
          </p>
        )}

        <Button
          type="submit"
          className={styles.submit}
          disabled={loading}
        >
          {loading ? "Launching..." : "Launch Session"}
        </Button>

        <p className={styles.footer}>
          <Link to={ROUTES.home}>Return to orbit</Link>
        </p>
      </form>
    </section>
  );
}

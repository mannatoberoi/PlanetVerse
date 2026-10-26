
import { NavLink, useNavigate } from "react-router-dom";
import { APP_NAME, ROUTES } from "../../utils/constants";
import { clearSessionUser } from "../../utils/session";
import { useUser } from "../../context/UserContext";
import styles from "./Navbar.module.css";

const links = [
  { to: ROUTES.dashboard, label: "Dashboard" },
  { to: ROUTES.galaxy, label: "Galaxy" },
  { to: ROUTES.profile, label: "Profile" },
];

export default function Navbar() {
  const navigate = useNavigate();
  const { user } = useUser();

  const loggedIn = Boolean(user?.user_id);

  function handleLogout() {
    clearSessionUser();
    navigate(ROUTES.login, { replace: true });
  }

  return (
    <header className={styles.navbar}>
      <nav className={styles.inner} aria-label="Main navigation">
        <NavLink to={ROUTES.home} className={styles.brand}>
          <span className={styles.brandMark} aria-hidden="true" />
          <span>{APP_NAME}</span>
        </NavLink>

        <ul className={styles.links}>
          {links.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  isActive
                    ? `${styles.link} ${styles.active}`
                    : styles.link
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}

          <li>
            {loggedIn ? (
              <button
                type="button"
                className={styles.login}
                onClick={handleLogout}
              >
                Logout
              </button>
            ) : (
              <NavLink to={ROUTES.login} className={styles.login}>
                Login
              </NavLink>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
}

const SESSION_KEY = "planetverse_user";

/**
 * Lightweight client session for the college demo.
 * Stores the safe user object returned by POST /api/users/login
 * (never stores the password).
 */
export function getSessionUser() {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function setSessionUser(user) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(user));
  window.dispatchEvent(new Event("planetverse-auth"));
}

export function clearSessionUser() {
  localStorage.removeItem(SESSION_KEY);
  window.dispatchEvent(new Event("planetverse-auth"));
}

export function isLoggedIn() {
  return Boolean(getSessionUser()?.user_id);
}

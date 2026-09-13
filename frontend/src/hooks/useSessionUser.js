import { useEffect, useState } from "react";
import { getSessionUser } from "./session";

/** Re-renders when login / logout updates the local session. */
export function useSessionUser() {
  const [user, setUser] = useState(() => getSessionUser());

  useEffect(() => {
    const sync = () => setUser(getSessionUser());
    window.addEventListener("planetverse-auth", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("planetverse-auth", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  return user;
}

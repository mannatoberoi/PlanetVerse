
import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { getSessionUser } from "../utils/session";

const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [user, setUser] = useState(() => getSessionUser());

  useEffect(() => {
    const syncUser = () => {
      setUser(getSessionUser());
    };

    window.addEventListener("planetverse-auth", syncUser);
    window.addEventListener("storage", syncUser);

    return () => {
      window.removeEventListener("planetverse-auth", syncUser);
      window.removeEventListener("storage", syncUser);
    };
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUser must be used inside UserProvider");
  }

  return context;
}

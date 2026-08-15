import { Outlet } from "react-router-dom";
import SpaceBackground from "../../components/SpaceBackground/SpaceBackground";

export default function AuthLayout() {
  return (
    <div className="app-shell">
      <SpaceBackground intensity="strong" />
      <main className="page">
        <Outlet />
      </main>
    </div>
  );
}

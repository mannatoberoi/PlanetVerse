import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import SpaceBackground from "../../components/SpaceBackground/SpaceBackground";

export default function MainLayout() {
  return (
    <div className="app-shell">
      <SpaceBackground />
      <Navbar />
      <main className="page page--with-nav">
        <Outlet />
      </main>
    </div>
  );
}

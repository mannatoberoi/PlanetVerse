import { useCallback, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LoadingScreen from "./components/LoadingScreen/LoadingScreen";
import MainLayout from "./layouts/MainLayout/MainLayout";
import AuthLayout from "./layouts/AuthLayout/AuthLayout";
import LandingPage from "./pages/LandingPage/LandingPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import Dashboard from "./pages/Dashboard/Dashboard";
import GalaxyPage from "./pages/GalaxyPage/GalaxyPage";
import CoursePage from "./pages/CoursePage/CoursePage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";

export default function App() {
  const [booting, setBooting] = useState(true);
  const handleBootComplete = useCallback(() => setBooting(false), []);

  return (
    <>
      {booting && <LoadingScreen onComplete={handleBootComplete} />}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />

          <Route element={<AuthLayout />}>
            <Route path="/login" element={<LoginPage />} />
          </Route>

          <Route element={<MainLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/galaxy" element={<GalaxyPage />} />
            <Route path="/course/:id" element={<CoursePage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

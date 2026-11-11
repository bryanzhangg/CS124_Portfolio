import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ProjectDetail from "./pages/ProjectDetail";
import Footer from "./components/Footer";
import ErrorBoundary from "./components/ErrorBoundary";
import ErrorPage from "./pages/ErrorPage";

export default function App() {
  const { pathname } = useLocation();
  return (
    <>
      <ErrorBoundary>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects/:slug" element={<ProjectDetail />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </ErrorBoundary>
      {pathname !== "/" && <Footer />}
    </>
  );
}

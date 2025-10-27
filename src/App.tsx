import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import LandingPage from "./pages/LandingPage";
import Markets from "./pages/Markets";
import Trade from "./pages/Trade";

export default function App() {
  return (
    <div data-rk className="min-h-screen" style={{
      backgroundColor: 'var(--rk-colors-modalBackground)',
      color: 'var(--rk-colors-modalText)',
      fontFamily: 'var(--rk-fonts-body)'
    }}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/markets" element={<Markets />} />
          <Route path="/trade/:symbol" element={<Trade />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

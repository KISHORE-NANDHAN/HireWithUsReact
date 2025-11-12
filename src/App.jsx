import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Careers from './pages/Careers';
import HireWithUs from './Pages/HireWithUs';

export default function App() {
  return (
      <BrowserRouter>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            //<Route path="/careers" element={<Careers />} />
            //<Route path="/hirewithus" element={<HireWithUs />} />
            {/* 404 route optional */}
          </Routes>
        </main>
      </BrowserRouter>
  );
}

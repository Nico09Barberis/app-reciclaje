import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Clasificator from "./pages/Clasificator";
import Home from "./pages/Home";
import Game from './pages/Game';
import Navbar from './components/Navbar';
import Info from './components/InfoComp';
import Footer from './components/Footer'; // 👈 Importamos el Footer

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Navbar /> {/* 👈 navbar siempre visible */}

        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/reciclator" element={<Clasificator />} />
            <Route path="/game" element={<Game />} />
            <Route path='/info' element={<Info />} />
          </Routes>
        </div>

        <Footer /> {/* 👈 footer siempre visible */}
      </div>
    </BrowserRouter>
  );
}

export default App;

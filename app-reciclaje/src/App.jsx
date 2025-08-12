import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Clasificator from "./pages/Clasificator";
import Home from "./pages/Home";
import Game from './pages/Game';
import Navbar from './components/Navbar';
import Info from './components/InfoComp';

function App() {
  return (
    <BrowserRouter>
      <Navbar /> {/* 👈 navbar siempre visible */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/reciclator" element={<Clasificator />} />
        <Route path="/game" element={<Game />} />
        <Route path='/info' element={<Info />} />
        {/* 
        <Route path="/reflection" element={<Reflection />} />
        <Route path="/results" element={<Results />} />
        */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;

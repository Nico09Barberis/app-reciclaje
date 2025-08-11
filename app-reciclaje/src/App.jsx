import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Clasificator from "./pages/Clasificator";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/reciclator" element={<Clasificator />} />
        {/*
        <Route path="/game" element={<Game />} />
        <Route path="/reflection" element={<Reflection />} />
        <Route path="/results" element={<Results />} />
        */}
      </Routes>
    </BrowserRouter>
  )
}

export default App

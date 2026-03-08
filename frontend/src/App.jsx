import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Game from './Pages/Game/Game';
import Historial from './Components/Historial';
import Results from './Pages/Results/Results';
import './index.css';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game" element={<Game />} /> 
        <Route path="/results" element={<Results />} />
        <Route path="/historial" element={<Historial />} />
      </Routes>
    </Router>
  )
}

export default App

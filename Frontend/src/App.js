import React from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css';
import Login from './Login';
import Admin from './Admin';
import Supervisor from './Supervisor';
import Worker from './Worker';
import Landing from './Landing';
import Awareness from './Awareness';  
function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/supervisor" element={<Supervisor />} />
          <Route path="/worker" element={<Worker />} />
          <Route path="/awareness" element={<Awareness />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;

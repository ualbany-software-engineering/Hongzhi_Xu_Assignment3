import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import EditMe from './pages/EditMe'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Buffer } from 'buffer';
window.Buffer = Buffer

function App () {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/home" element={<Home />} />
      <Route path="/me" element={<EditMe />} />
      <Route path="/" element={<Navigate to="/home" replace />} />
    </Routes>
  )
}

export default App;

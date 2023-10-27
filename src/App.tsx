import React from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './Pages/login';
import Nav from './Components/nav'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Navigate, useNavigate } from "react-router-dom";
import Home from './Pages/Home';

import Register from './Pages/Register';

function App() {
  
  return (
    <div className="App">
      <BrowserRouter>
        <Nav></Nav>
        <main className="form-signin">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}


export default App;
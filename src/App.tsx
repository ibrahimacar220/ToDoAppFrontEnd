import React from 'react';
import logo from './logo.svg';
import './App.css';
import Nav from './Components/nav';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './Pages/login';
import Register from './Pages/Register';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <main className="form-signin">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}

export default App;
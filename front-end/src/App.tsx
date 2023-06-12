import './App.css';
import React, { useState, useEffect } from 'react';
import Login from './components/Login/Login'
import HomePage from './components/Home/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FileUpload from './components/FileUpload/FileUpload';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is already logged in
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setIsAuthenticated(parsedUser);
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/fileUpload" element={<FileUpload />} />
      </Routes>
    </Router>
  );
}

export default App;

import './App.css';
import React, { useState, useEffect } from 'react';
import Login from './components/Login/Login'
import HomePage from './components/Home/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FileUpload from './components/FileUpload/FileUpload';
import FormPage from './components/Form/Form';
import NewForm from './components/Form/NewForm';


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is already logged in
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={isAuthenticated ? <HomePage /> : <Login />} />
        <Route path="/fileUpload" element={isAuthenticated ? <FileUpload /> : <Login />} />
        <Route path="/form" element={isAuthenticated ? <NewForm /> : <Login />} />

      </Routes>
    </Router>
  );
}

export default App;

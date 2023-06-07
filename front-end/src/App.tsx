import './App.css';
import Login from './components/Login/Login'
import HomePage from './components/Home/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" Component={Login} />
        <Route path="/login" Component={Login} />
        <Route path="/home" Component={HomePage} />

      </Routes>

    </Router>
  );
}

export default App;

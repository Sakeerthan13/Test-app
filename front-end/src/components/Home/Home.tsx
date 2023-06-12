import React from 'react';
import './Home.css';
import { useNavigate } from 'react-router-dom';

const HomePage: React.FC = () => {

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/login');
    };
    return (
        <div>
            <header className="menu-bar">
                <nav>
                    <ul>
                        <li>
                            <a href="/home">Home</a>
                        </li>
                        <li>
                            <a href="/fileUpload">File Upload</a>
                        </li>
                        <li>
                            <a href="/form">Form</a>
                        </li>

                        <li className="logout">
                            <button onClick={handleLogout}>Logout</button>
                        </li>
                    </ul>
                </nav>
            </header>
            <div className="main-content">
                <div className="sidebar">
                    <div className="user-details">
                        <div>
                            <h3>User Details</h3>
                            <h5>Name: Sakeerthan</h5>
                            <h5>Email: sakeerthan@gmail.com</h5>
                            <h5>Address: Chunnakam Jaffna Sri Lanka.</h5>
                        </div>
                    </div>
                </div>
                <div className="content">
                    <h1>Welcome to the Home Page</h1>
                    <p>This is a home page </p>
                </div>
            </div>
        </div>
    );
};

export default HomePage;

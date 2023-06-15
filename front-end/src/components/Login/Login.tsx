import React, { useState, useEffect } from 'react';
import './LoginScreen.css';
import { useNavigate } from 'react-router-dom';

interface User {
    email: string;
    password: string;
}

interface ErrorProps {
    message: string;
}

const Error: React.FC<ErrorProps> = ({ message }) => {
    return <div className="login-error">{message}</div>;
};

const LoginScreen: React.FC = () => {
    const [user, setUser] = useState<User>({
        email: '',
        password: '',
    });
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [error, setError] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        // Check if user is already logged in
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
            setLoggedIn(true);
        }
    }, []);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setUser((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleLogin = (event: React.FormEvent) => {
        event.preventDefault();
        if (user.email === 'sakeerthan@gmail.com' && user.password === 'Sakeer123') {
            setLoggedIn(true);
            localStorage.setItem('user', JSON.stringify(user));
            setError('');
        } else {
            setError('Invalid credentials');
        }
    };

    if (isLoggedIn) {
        navigate('/home');
    }

    return (
        <div className="login-screen">
            <div className="login-container">
                {error && <Error message={error} />}
                <h1>Login</h1>
                <form onSubmit={handleLogin}>
                    <div>
                        <label>Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={user.email}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Password:</label>
                        <input
                            type="password"
                            name="password"
                            value={user.password}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    );
};

export default LoginScreen;

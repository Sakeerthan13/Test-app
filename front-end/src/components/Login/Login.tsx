import React, { useState } from 'react';
import './LoginScreen.css';

interface LoginFormState {
    email: string;
    password: string;
}

const LoginScreen: React.FC = () => {
    const [formData, setFormData] = useState<LoginFormState>({
        email: '',
        password: '',
    });

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleFormSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        console.log('Login form submitted:', formData);
        // Add your login logic here
    };

    return (
        <div className="login-screen">
            <div className="login-container">
                <h1>Login</h1>
                <form onSubmit={handleFormSubmit}>
                    <div>
                        <label>Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Password:</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
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

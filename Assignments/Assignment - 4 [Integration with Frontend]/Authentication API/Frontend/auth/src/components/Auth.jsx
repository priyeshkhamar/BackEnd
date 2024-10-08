import React, { useState } from 'react';
import axios from 'axios';

const Auth = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/auth/register', {
                username,
                password
            });
            setMessage(response.data.message);
        } catch (error) {
            setMessage(error.response.data.message || 'Error registering');
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', {
                username,
                password
            });
            setMessage(response.data.message);
            setIsLoggedIn(true);
        } catch (error) {
            setMessage(error.response.data.message || 'Error logging in');
        }
    };

    const handleLogout = async () => {
        try {
            await axios.post('http://localhost:5000/api/auth/logout', {}, { withCredentials: true });
            setMessage('Logged out successfully');
            setIsLoggedIn(false);
        } catch (error) {
            setMessage(error.response.data.message || 'Error logging out');
        }
    };

    const handleLogoutAll = async () => {
        try {
            await axios.post('http://localhost:5000/api/auth/logoutAll', {}, { withCredentials: true });
            setMessage('Logged out from all sessions');
            setIsLoggedIn(false);
        } catch (error) {
            setMessage(error.response.data.message || 'Error logging out from all sessions');
        }
    };

    return (
        <div>
            <h2>{isLoggedIn ? 'Welcome!' : 'Authentication'}</h2>
            {message && <p>{message}</p>}
            {!isLoggedIn ? (
                <form onSubmit={handleLogin}>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit">Login</button>
                    <button type="button" onClick={handleRegister}>Register</button>
                </form>
            ) : (
                <div>
                    <button onClick={handleLogout}>Logout from this device</button>
                    <button onClick={handleLogoutAll}>Logout from all devices</button>
                </div>
            )}
        </div>
    );
};

export default Auth;

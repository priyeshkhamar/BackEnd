// src/components/Login.jsx
import { useState } from 'react';
import { login } from '../api/auth';
import { useHistory } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await login({ username, password });
            const token = response.data.token;
            localStorage.setItem('token', token);  // Store token in localStorage
            alert('Login successful');
            history.push('/dashboard');  // Redirect to dashboard
        } catch (error) {
            alert('Error logging in');
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;

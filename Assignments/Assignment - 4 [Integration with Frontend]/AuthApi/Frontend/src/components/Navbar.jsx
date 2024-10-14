// src/components/Navbar.jsx
import { useHistory } from 'react-router-dom';
import { logout, logoutAll } from '../api/auth';

const Navbar = () => {
    const history = useHistory();
    const token = localStorage.getItem('token');

    const handleLogout = async () => {
        if (token) {
            await logout(token);
            localStorage.removeItem('token');  // Remove token from localStorage
            history.push('/login');
        }
    };

    const handleLogoutAll = async () => {
        if (token) {
            await logoutAll(token);
            localStorage.removeItem('token');
            history.push('/login');
        }
    };

    return (
        <nav>
            <ul>
                {token ? (
                    <>
                        <li><button onClick={handleLogout}>Logout from this device</button></li>
                        <li><button onClick={handleLogoutAll}>Logout from all devices</button></li>
                    </>
                ) : (
                    <>
                        <li><a href="/login">Login</a></li>
                        <li><a href="/register">Register</a></li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;

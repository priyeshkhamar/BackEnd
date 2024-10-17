import axios from 'axios';

const Dashboard = () => {
    const handleLogout = async () => {
        const token = localStorage.getItem('token');
        await axios.post('http://localhost:3000/logout', {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        localStorage.removeItem('token');
        window.location.href = '/login'; // Redirect to login after logout
    };

    const handleLogoutAll = async () => {
        const token = localStorage.getItem('token');
        await axios.post('http://localhost:3000/logoutAll', {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        localStorage.removeItem('token');
        window.location.href = '/login'; // Redirect to login after logging out from all devices
    };

    return (
        <div className="container mt-5">
            <h2>Welcome to the Dashboard</h2>
            <button className="btn btn-danger m-2" onClick={handleLogout}>Logout from Current Device</button>
            <button className="btn btn-warning m-2" onClick={handleLogoutAll}>Logout from All Devices</button>
        </div>
    );
};

export default Dashboard;

// src/components/Dashboard.jsx
import { useHistory } from 'react-router-dom';

const Dashboard = () => {
    const history = useHistory();
    const token = localStorage.getItem('token');

    if (!token) {
        history.push('/login'); 
        return null;
    }

    return (
        <div>
            <h2>Welcome to the Dashboard</h2>
            <p>This is a protected route that requires authentication.</p>
        </div>
    );
};

export default Dashboard;

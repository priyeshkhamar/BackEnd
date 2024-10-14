// src/api/auth.js
import axios from 'axios';

// Set base URL for your API
const API_URL = 'http://localhost:3000';  // Replace with your backend URL

// Register user
export const register = async (userData) => {
    return await axios.post(`${API_URL}/auth/register`, userData);
};

// Login user
export const login = async (userData) => {
    return await axios.post(`${API_URL}/auth/login`, userData);
};

// Logout from current device
export const logout = async (token) => {
    return await axios.post(`${API_URL}/auth/logout`, {}, {
        headers: { 'Authorization': `Bearer ${token}` }
    });
};

// Logout from all devices
export const logoutAll = async (token) => {
    return await axios.post(`${API_URL}/auth/logout-all`, {}, {
        headers: { 'Authorization': `Bearer ${token}` }
    });
};

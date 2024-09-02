import axios from 'axios';

const API_URL = 'http://localhost:3001';

export const getUserInfo = (userId) => {
    const url = `${API_URL}/auth/basicinfo/${userId}`;
    return axios.get(url, { withCredentials: true });
};

export const updateUserProfile = (userId, formData) => {
    const url = `${API_URL}/auth/updateuser/${userId}`;
    return axios.put(url, formData, { withCredentials: true });
};

export const deleteUser = (userId) => {
    return axios.delete(`${API_URL}/auth/deleteuser/${userId}`, { withCredentials: true });
};
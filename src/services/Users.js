import axios from 'axios';

const API_URL = 'https://harmoniaserver-01d3f6b29b48.herokuapp.com/';

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

import axios from "axios";

const API_URL = "http://localhost:3001";

//Créé un utlisateur
export const createUser = (userData) => {
  return axios.post(`${API_URL}/auth`, userData);
};
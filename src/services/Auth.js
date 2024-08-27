import axios from "axios";

const API_URL = "http://localhost:3001";

//Créé un utlisateur
export const createUser = (userData) => {
  return axios.post(`${API_URL}/auth`, userData);
};


// import axios from "axios";

// //const API_URL = "http://localhost:3001";

// export const createUser = (userData) => {
//   return axios.post('http://localhost:3001/auth', userData, {
//     withCredentials: true  // Nécessaire pour gérer les cookies et les sessions côté serveur
//   });
// };

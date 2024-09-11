import axios from 'axios';

const API_URL = 'https://harmoniaserver-01d3f6b29b48.herokuapp.com';

export const addAnimal = async (animalData, token) => {
  try {
    const response = await axios.post(`${API_URL}/animals/ajoutAnimal`, animalData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Erreur lors de l'ajout de l'animal:", error);
    throw error;
  }
};

export const updateAnimal = async (animalId, animalData, token) => {
    try {
      const response = await axios.put(`${API_URL}/animals/updateAnimal/${animalId}`, animalData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'animal:", error);
      throw error;
    }
};

export const getAnimalsByUserId = async (userId) => {
    try {
      const response = await axios.get(`${API_URL}/animals/byUserId/${userId}`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des animaux:', error);
      throw error;
    }
};
  
  export const deleteAnimalById = async (animalId) => {
    try {
      const response = await axios.delete(`${API_URL}/animals/deleteAnimal/${animalId}`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'animal:', error);
      throw error;
    }
};


import axios from 'axios';

const API_URL = 'https://harmoniaserver-01d3f6b29b48.herokuapp.com';

export const getAnimauxByUserId = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/animals/byUserId/${userId}`, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des animaux:', error);
    throw error;
  }
};

export const addActivite = async (activite) => {
  try {
    const response = await axios.post(`${API_URL}/activities/ajoutActivite`, activite, { withCredentials: true });
    return response;
  } catch (error) {
    console.error('Erreur lors de l\'ajout de l\'activité', error);
    throw error;
  }
};

export const getActivitesByUserId = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/activities/getActivitesByUserId/${userId}`, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des activités:', error);
    throw error;
  }
};

export const deleteActivite = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/activities/deleteActivites/${id}`, { withCredentials: true });
    return response;
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'activité:', error);
    throw error;
  }
};


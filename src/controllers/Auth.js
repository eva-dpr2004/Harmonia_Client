import axios from "axios";
import { useEffect } from "react";

const API_URL = "http://localhost:3001";

export const createUser = (userData) => {
  return axios.post(`${API_URL}/auth`, userData);
};

export const loginUser = (userData) => {
  return axios.post(`${API_URL}/auth/login`, userData);
};

export const useAuth = (setAuthState) => {
  useEffect(() => {
    axios
      .get("http://localhost:3001/auth/auth", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if (response.data.error) {
          setAuthState((prevState) => ({...prevState, status: false}));
        } else {
          setAuthState({
            Nom: response.data.Nom, 
            Id_Utilisateur: response.data.Id_Utilisateur, 
            status: true
          });
        }
      });
  }, [setAuthState]);
};


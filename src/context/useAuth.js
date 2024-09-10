import { useState, useEffect } from 'react';
import axios from 'axios';

const useAuth = () => {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    isLoading: true,
    user: null,
    token: null,
  });

  useEffect(() => {
    axios.get("https://harmoniaserver-01d3f6b29b48.herokuapp.com/auth/auth", { withCredentials: true })
      .then((response) => {
        if (response.data.error) {
          setAuthState({
            isAuthenticated: false,
            isLoading: false,
            user: null,
            token: null,
          });
        } else {
          setAuthState({
            isAuthenticated: true,
            isLoading: false,
            user: response.data,
            token: response.data.token, 
          });
        }
      }).catch(() => {
        setAuthState({
          isAuthenticated: false,
          isLoading: false,
          user: null,
          token: null,
        });
      });
  }, []);

  return [authState, setAuthState];
};

export default useAuth;

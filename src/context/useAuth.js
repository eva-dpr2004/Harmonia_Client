import { useState, useEffect } from 'react';
import axios from 'axios';

const useAuth = () => {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    isLoading: true,
    user: null,
  });

  useEffect(() => {
    axios.get("http://localhost:3001/auth/auth", { withCredentials: true })
      .then((response) => {
        if (response.data.error) {
          setAuthState({
            isAuthenticated: false,
            isLoading: false,
            user: null,
          });
        } else {
          setAuthState({
            isAuthenticated: true,
            isLoading: false,
            user: response.data,
          });
        }
      }).catch(() => {
        setAuthState({
          isAuthenticated: false,
          isLoading: false,
          user: null,
        });
      });
  }, []);

  return [authState, setAuthState];
};

export default useAuth;

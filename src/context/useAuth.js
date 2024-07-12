import { useState, useEffect } from 'react';
import axios from 'axios';

const useAuth = () => {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    isLoading: true,
  });

  useEffect(() => {
    axios.get("http://localhost:3001/auth/auth", { withCredentials: true })
      .then((response) => {
        if (response.data.error) {
          setAuthState({
            isAuthenticated: false,
            isLoading: false,
          });
        } else {
          setAuthState({
            isAuthenticated: true,
            isLoading: false,
          });
        }
      }).catch(() => {
        setAuthState({
          isAuthenticated: false,
          isLoading: false,
        });
      });
  }, []);

  return [authState, setAuthState];
};

export default useAuth;

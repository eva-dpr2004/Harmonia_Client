import { useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from './context/AuthContext';

const TokenChecker = () => {
  const { setAuthState } = useContext(AuthContext);

  useEffect(() => {
    const intervalId = setInterval(async () => {
      try {
        await axios.get('https://harmoniaserver-01d3f6b29b48.herokuapp.com/auth/auth', { withCredentials: true });
      } catch (error) {
        if (error.response && error.response.status === 401 && error.response.data.error.includes('Token expiré ou invalide')) {
          document.cookie = "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
          setAuthState({
            isAuthenticated: false,
            isLoading: false,
            user: null,
          });

          alert("La session a expiré. Vous allez être redirigé à la page de connexion.");
          window.location.reload();
        }
      }
    }, 1 * 60 * 60 * 1000);

    return () => clearInterval(intervalId);
  }, [setAuthState]);

  return null;
};

export default TokenChecker;

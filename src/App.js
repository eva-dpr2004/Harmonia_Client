import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter } from "react-router-dom";
import Router from './Router';
import axios from 'axios';
import { AuthContext } from './context/AuthContext';

function App() {
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

  return (
    <div className="App">
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </AuthContext.Provider>
    </div>
  );
}

export default App;

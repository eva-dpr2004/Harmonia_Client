import React from 'react';
import './App.css';
import { BrowserRouter } from "react-router-dom";
import Router from './Router';
import { AuthContext } from './context/AuthContext';
import { AnimalProvider } from './context/AnimalContext';
import useAuth from './context/useAuth'; 

function App() {
  const [authState, setAuthState] = useAuth(); 

  return (
    <div className="App">
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <AnimalProvider>
          <BrowserRouter>
            <Router />
          </BrowserRouter>
        </AnimalProvider>
      </AuthContext.Provider>
    </div>
  );
}

export default App;

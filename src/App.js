import React from 'react';
import './App.css';
import { BrowserRouter } from "react-router-dom";
import Router from './Router';
import { AuthContext } from './context/AuthContext';
import useAuth from './context/useAuth'; 

function App() {
  const [authState, setAuthState] = useAuth(); //hook personnalisé

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

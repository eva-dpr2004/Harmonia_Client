import React from 'react';
import './App.css';
import { BrowserRouter } from "react-router-dom";
import Router from './Router';
import { AuthContext } from './context/AuthContext';
import { AnimalProvider } from './context/AnimalContext';
import useAuth from './context/useAuth'; 
import DisableRightClick from './restrictions/disableRightClick';
import TokenChecker from './TokenChecker';

function App() {
  const [authState, setAuthState] = useAuth(); 

  return (
    <div className="App">
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <AnimalProvider>
          <BrowserRouter>
            <DisableRightClick>
            <TokenChecker />
              <Router />
            </DisableRightClick>
          </BrowserRouter>
        </AnimalProvider>
      </AuthContext.Provider>
    </div>
  );
}

export default App;

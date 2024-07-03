// App.js
import React from 'react';
import './App.css';
import { BrowserRouter } from "react-router-dom";
import Router from './Router';
import { AuthProvider } from './context/AuthContext'; 

function App() {
  return (
    <div>
      <BrowserRouter>
        <AuthProvider>
          <Router />
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;

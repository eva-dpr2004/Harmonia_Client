import React, { createContext, useState, useMemo } from 'react';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState({
        Nom: null,
        Id_Utilisateur: null,
        status: false
    });

    const authContextValue = useMemo(() => ({
        authState,
        setAuthState
    }), [authState]);

    return (
        <AuthContext.Provider value={authContextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;

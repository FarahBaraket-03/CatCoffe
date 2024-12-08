// AuthContext.js
import React, { createContext, useState, useContext } from 'react';

// Créer le contexte
const AuthContext = createContext();

// Créer un provider pour le contexte
export const AuthProvider = ({ children }) => {
    const [login, setLogin] = useState(false); // État de connexion
    const [user, setUser] = useState({
        name: window.localStorage.getItem("UserName"), email:window.localStorage.getItem("UserEmail") ,
        id:window.localStorage.getItem("UserId")
    }); // État pour le nom d'utilisateur
    return (
        <AuthContext.Provider value={{ login, setLogin, user, setUser}}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook pour utiliser le contexte
export const useAuth = () => {
    return useContext(AuthContext);
};
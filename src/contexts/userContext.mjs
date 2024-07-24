import React, { createContext, useContext, useState, useEffect } from 'react';
import { ResponseUser } from '../Services/ApiClient/responseModels.mjs';
import apiClient from '../Services/ApiClient'; // Asegúrate de que esta importación es correcta

// Crear el contexto
const LoggedUserContext = createContext();

function LoggedUserContextProvider({ children }) {
    const [loggedUser, setLoggedUser] = useState(new ResponseUser());
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        const fetchLoggedUser = async () => {
            try {
                const user = await apiClient.getLoggedUser();
                setLoggedUser(user);
            } catch (error) {
                console.error('Error al obtener el usuario logueado:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchLoggedUser();
    }, []);

    if (loading) {
        return <div>Cargando...</div>;
    }

    return (
        <LoggedUserContext.Provider value={{ loggedUser, setLoggedUser }}>
            {children}
        </LoggedUserContext.Provider>
    );
}

export { LoggedUserContext, LoggedUserContextProvider };

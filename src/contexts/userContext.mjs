import React, { createContext, useContext, useState } from 'react';
import {  ResponseUser } from '../Services/ApiClient/responseModels.mjs';

// Crear el contexto
const LoggedUserContext = createContext();

function LoggedUserContextProvider({ children }) {
    const [ loggedUser, setLoggedUser ] = useState(new ResponseUser());

    return (
        <LoggedUserContext.Provider value={{ loggedUser, setLoggedUser }}>
        {children}
        </LoggedUserContext.Provider>
    );
}

export { LoggedUserContext, LoggedUserContextProvider };
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import "../../css/generics.css";
import { LoggedUserContext, LoggedUserContextProvider } from '../../contexts/userContext.mjs';

function WelcomeMessage() {
  const {loggedUser, setLoggedUser}  = useContext(LoggedUserContext);

  return (
    <span className='small_text'>
      {loggedUser.isValid() ? (
        <>Bienvenido <strong>{loggedUser.username}!</strong></>
      ) : (
        <><strong>(!) SIN SESION</strong></>
      )}
    </span>
  );
};

export default function Navbar() {
  return (
    <div className='container columns'>
        <WelcomeMessage/>

        <Link className='accept_btn' to={"/logout"}> logout </Link>
        <Link className='accept_btn' to={"/channels/my"}> mis canales </Link>
        <Link className='accept_btn' to={"/channels/search"}> buscar canales </Link>
        
        <br></br>
        <span className='small_text'>Admin section</span>
        <Link className='accept_btn' to={"/channels/admin/my"}> administrar canales </Link>
        <Link className='accept_btn' to={"/events/create"}> crear evento </Link>
        <Link className='accept_btn' to={"/access_documents/my"}> mis AccessDocument </Link>
    </div>
  );
}

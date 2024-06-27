import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <div className='container columns'>
        <Link to={"/logout"}> logout </Link>

        <Link to={"/channels/my"}> mis canales </Link>
        <Link to={"/channels/search"}> buscar canales </Link>

        <Link to={"/events/create"}> crear evento </Link>

        <Link to={"/access_documents/my"}> mis AccessDocument </Link>
    </div>
  );
}

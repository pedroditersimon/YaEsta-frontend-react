import React from 'react';
import { Link } from 'react-router-dom';

import "../../css/generics.css";

export default function Navbar() {
  return (
    <div className='container columns'>

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

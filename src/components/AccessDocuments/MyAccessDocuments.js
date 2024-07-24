import { useState, useEffect } from 'react';
import { Channel } from "../Channels/Channel.js";
import ChannelList from "../Channels/ChannelList.js";
import apiClient from '../../Services/ApiClient/apiClient.mjs';

import {Link} from "react-router-dom";
import { AccessDocumentList } from './AccessDocumentList.mjs';

export default function MyAccessDocuments() {
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const getMyAccessDocuments = async () => {
        setIsLoading(true);
        setResults([]);
        
        const results = await apiClient.getUserAccessDocuments();
        setResults(results);
        setIsLoading(false);
    };

    useEffect(() => {
        getMyAccessDocuments();
    }, []);

    return (
        <div >
            <div className='rows center'>
                <h1 className="title">Mis Documentos de acceso (create)</h1>
                <button className="accept_btn" onClick={getMyAccessDocuments} disabled={isLoading}>
                    {isLoading ? 'Refreshing...' : 'Refresh'}
                </button>
                <Link className="accept_btn" to={"/access_documents/create"}>Crear Documento de acceso</Link>
            </div>
            {results.length == 0 && 
                <span className="small_text">No hay nada que mostrar</span>
            }
            {results.length > 0 && 
                <div className='columns'>
                    {isLoading && <p className="loading_text">Loading...</p>}
                    <AccessDocumentList documents={results} admin_mode={true} />
                </div>
            }
        </div>
    );
}

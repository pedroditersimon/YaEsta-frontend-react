import { useState, useEffect } from 'react';
import { Channel } from "../Channels/Channel.js";
import ChannelList from "../Channels/ChannelList.js";
import apiClient from '../../Services/ApiClient/apiClient.mjs';

import {Link} from "react-router-dom";

import './MyAdminChannels.css';

export default function MyAdminChannels() {
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const getMyAdminChannels = async () => {
        setIsLoading(true);
        setResults([]);
        
        const results = await apiClient.getUserAdminChannels();
        setResults(results);
        setIsLoading(false);
    };

    useEffect(() => {
        getMyAdminChannels();
    }, []);

    return (
        <div >
            <div className='rows center'>
                <h1 className="title">Administrar Canales</h1>
                <button className="accept_btn" onClick={getMyAdminChannels} disabled={isLoading}>
                    {isLoading ? 'Refreshing...' : 'Refresh'}
                </button>
                <Link className="accept_btn" to={"/channels/create"}>Crear canal</Link>
            </div>
            <div className='columns'>
                {isLoading && <p className="loading_text">Loading...</p>}
                <ChannelList channels={results} admin_mode={true} />
            </div>
        </div>
    );
}

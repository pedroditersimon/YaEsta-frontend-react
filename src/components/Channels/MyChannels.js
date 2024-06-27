import { useState, useEffect } from 'react';
import { Channel } from "../Channels/Channel.js";
import ChannelList from "../Channels/ChannelList.js";
import apiClient from '../../Services/ApiClient/apiClient.mjs';

import {Link} from "react-router-dom";

import './MyChannels.css';

export default function MyChannels() {
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const getMyChannels = async () => {
        setIsLoading(true);
        setResults([]);
        
        const results = await apiClient.getUserChannels();
        setResults(results);
        setIsLoading(false);
    };

    useEffect(() => {
        getMyChannels();
    }, []);

    return (
        <div >
            <div className='rows center'>
                <h1 className="title">Mis Canales</h1>
                <button className="accept_btn" onClick={getMyChannels} disabled={isLoading}>
                    {isLoading ? 'Refreshing...' : 'Refresh'}
                </button>
                <Link className="accept_btn" to={"/channels/create"}>Crear canal</Link>
            </div>
            <div className='columns'>
                {isLoading && <p className="loading_text">Loading...</p>}
                <ChannelList channels={results} />
            </div>
        </div>
    );
}

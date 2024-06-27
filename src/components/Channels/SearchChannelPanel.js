import { useState } from 'react';
import { Channel } from "../Channels/Channel.js";
import ChannelList from "../Channels/ChannelList.js";

import apiClient from '../../Services/ApiClient/apiClient.mjs';

import './SearchChannelPanel.css';

export default function SearchChannelPanel() {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleSearch = async () => {
        setIsLoading(true);
        setSearchResults([]);

        const results = await apiClient.getPublicChannels(searchTerm);
        setSearchResults(results);
        setIsLoading(false);
    };

    return (
        <div>
            <div className="columns">
                <h1 className="title">Buscar Canales</h1>
                <div className='rows'>
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        placeholder="Channel title..."
                        disabled={isLoading}
                    />
                    <button className="accept_btn" onClick={handleSearch} disabled={isLoading}>
                        {isLoading ? 'Searching...' : 'Search'}
                    </button>
                </div>
            </div>
            <div className='columns'>
                {isLoading && <p className="loading_text">Loading...</p>}
                <ChannelList channels={searchResults} />
            </div>
        </div>
    );
}

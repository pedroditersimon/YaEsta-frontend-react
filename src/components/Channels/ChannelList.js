import { useState, useEffect } from 'react';
import { Channel } from "../Channels/Channel.js";
import apiClient from '../../Services/ApiClient/apiClient.mjs';

import './ChannelList.css';

export default function ChannelList({ channels, admin_mode=false }) {
    if (channels.length == 0) {
        return(<span className="small_text">No hay nada que mostrar</span>);
    }

    return (
        <div className='columns'>
            {channels.map(channel => (
                <div name={channel._id} className="space2">
                    <Channel channel={channel} admin_mode={admin_mode} />
                </div>
            ))}
        </div>
    );
}

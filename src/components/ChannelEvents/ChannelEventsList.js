import { useState, useEffect } from 'react';
import { ChannelEvent } from "./ChannelEvent.js";
import apiClient from '../../Services/ApiClient/apiClient.mjs';

import './ChannelEventsList.css';

export default function ChannelEventsList({ channel_id, channel_events=[], admin_mode=false }) {
    const [ isLoading, setIsLoading ] = useState(false);
    const [events, setEvents] = useState(channel_events);


    async function handleGetClick() {
        setIsLoading(true);
        setEvents([]);

        var result;
        if (admin_mode) {
            result = await apiClient.getEventsByChannelID(channel_id);
        }
        else {
            result = await apiClient.getCompletedEventsByChannelID(channel_id);
        }
        setEvents(result);
        setIsLoading(false);
    }

    useEffect(() => {
        handleGetClick()
    }, []);

    return (
        <div className="columns">
            <button disabled={isLoading} className="accept_btn" onClick={handleGetClick}>Get events</button>
            {events.length == 0 && 
                <span className="small_text">No hay nada que mostrar</span>
            }
            {events.length > 0 && 
                <div className='rows center'>
                    {events.map(event => (
                        <div name={event._id}>
                            <ChannelEvent event_info={event} admin_mode={admin_mode} />
                        </div>
                    ))}
                </div>
            }
        </div>
    );
}

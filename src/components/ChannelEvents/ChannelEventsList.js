import { useState, useEffect } from 'react';
import { ChannelEvent } from "./ChannelEvent.js";
import apiClient from '../../Services/ApiClient/apiClient.mjs';

import './ChannelEventsList.css';

export default function ChannelEventsList({ channel_id, channel_events=[] }) {
    const [ isLoading, setIsLoading ] = useState(false);
    const [events, setEvents] = useState(channel_events);


    async function handleGetClick() {
        setIsLoading(true);
        setEvents([]);

        // user must have to use getChannelCompletedEvents insted!
        const result = await apiClient.getEventsByChannelID(channel_id);
        setEvents(result);
        setIsLoading(false);
    }

    useEffect(() => {
        handleGetClick()
    }, []);

    return (
        <div className="rows">
            <button disabled={isLoading} className="accept_btn" onClick={handleGetClick}>Get events</button>
            {events.length == 0 && 
                <span className="small_text">No hay nada que mostrar</span>
            }
            {events.length > 0 && 
                <div className='rows center'>
                    {events.map(event => (
                        <div name={event._id}>
                            <ChannelEvent event_info={event} />
                        </div>
                    ))}
                </div>
            }
        </div>
    );
}

import { useState } from "react";
import apiClient from "../../Services/ApiClient/apiClient.mjs";

import "./ChannelEvent.css";

export function ChannelEvent({ event_info }) {
    const [event, setEvent] = useState(event_info);
    const [ isDeleted, setIsDeleted ] = useState(false);

    async function handleGetClick() {
        setEvent({});
        const result = await apiClient.getEventByID(event_info._id);
        setEvent(result);
    }

    async function handleDeleteClick() {
        const result = await apiClient.deleteEvent(event_info._id);
        setIsDeleted(result);
    }

    if (isDeleted) {
        return (<span className="deleted_message">[Deleted]</span>);
    }

    return (
        <div className="container columns center">
            <div className="columns less_gap small_text">
                <span className="bold">Event</span>
                <span className="">ID: {event._id}</span>
                <span className="">Channel ID: {event.channel_id}</span>
                <span className="">Creation Date: {event.creation_date}</span>
                <span className="">Status: {event.status}</span>
                <span className="">Title: {event.title}</span>
                <span className="">Description: {event.description}</span>
                <span className="">Action Date: {event.action_date}</span>
                <span className="">Reminder Date: {event.reminder_date}</span>
                <span className="">Notice Time: {event.notice_time}</span>
                <span className="">Map Location: {event.map_location}</span>
            </div>
            <div className="rows">
                <button className="accept_btn" onClick={handleGetClick}>Refresh</button>
                <button className="cancel_btn" onClick={handleDeleteClick}>Borrar</button>
            </div>

        </div>
    );
}

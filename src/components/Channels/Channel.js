import apiClient from "../../Services/ApiClient/apiClient.mjs";
import ChannelEventsList from "../ChannelEvents/ChannelEventsList.js";
import { useState } from "react";
import { ChannelAccessDocumentList } from "../AccessDocuments/ChannelAccessDocumentList.mjs";
import "./Channel.css";

import { Link } from "react-router-dom";

export function Channel({ channel , admin_mode=false}) {
    const [ isLoading, setIsLoading ] = useState(false);
    const [ isDeleted, setIsDeleted ] = useState(false);

    async function handleSubscribeClick() {
        setIsLoading(true);

        const result = await apiClient.subscribeToChannel(channel._id);
        setIsLoading(false);
    }

    async function handleUnsubscribeClick() {
        setIsLoading(true);

        const result = await apiClient.unsubscribeFromChannel(channel._id);
        setIsDeleted(result);
        setIsLoading(false);
    }

    async function handleDeleteClick() {
        setIsLoading(true);

        const result = await apiClient.deleteChannel(channel._id);
        setIsDeleted(result);
        setIsLoading(false);
    }

    if (isDeleted) {
        return (<></>);
    }

    return (
        <div className="rows">
            <div className="container columns center">
                <div className="columns less_gap small_text">
                    <span className="bold">Channel</span>
                    {admin_mode && (<>
                        <span className="">ID: {channel._id}</span>
                    </>)}
                    <span className="">Creation Date: {channel.creation_date}</span>
                    <span className="">Title: {channel.title}</span>
                    <span className="">Public: {channel.isPublic ? 'Yes' : 'No'}</span>
                    <span className="">Members: {channel.membersCount}</span>
                    <span className="">Events: {channel.eventsCount}</span>
                </div>

                <div className="rows">
                    <button disabled={isLoading} className="cancel_btn" onClick={handleUnsubscribeClick}>De-subscribirse</button>
                    <button disabled={isLoading} className="accept_btn" onClick={handleSubscribeClick}>Subscribirse</button>
                </div>
                {admin_mode && (<>
                    <button disabled={isLoading} className="cancel_btn" onClick={handleDeleteClick}>Borrar canal</button>
                    <Link className="accept_btn" to={`/events/create/?channel_id=${channel._id}`}>Crear evento</Link>
                    <Link className="accept_btn" to={`/access_documents/create/?target_channel_id=${channel._id}`}>Crear documento de acceso</Link>
                </>)}
            </div>
            
            {admin_mode && (<>
                <ChannelAccessDocumentList channel_id={channel._id} admin_mode={admin_mode} />
            </>)}
            <ChannelEventsList channel_id={channel._id} admin_mode={admin_mode} />

        </div>
       
    );
}



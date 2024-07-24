import { useState, useEffect } from "react";
import apiClient from "../../Services/ApiClient/apiClient.mjs";

import "./ChannelAccessDocumentList.css";
import {AccessDocument} from "./AccessDocument.mjs";

export function ChannelAccessDocumentList({ channel_id="", documents=[], admin_mode=false }) {
    const [accessDocuments, setAccessDocuments] = useState(documents);
    const [ isLoading, setIsLoading ] = useState(false);

    async function handleGetClick() {
        if (channel_id == "")
            return;

        setIsLoading(true);
        setAccessDocuments([]);

        const result = await apiClient.getAccessDocumentsByChannelID(channel_id);
        setAccessDocuments(result);
        setIsLoading(false);
    }

    useEffect(() => {
        handleGetClick()
    }, []);

    return (
        <div className="columns">
            <button disabled={isLoading} className="accept_btn" onClick={handleGetClick}>Get AccessDocuments</button>
            {accessDocuments.length == 0 && 
                <span className="small_text">No hay nada que mostrar</span>
            }
            {accessDocuments.length > 0 && 
                <div className='rows center'>
                    {accessDocuments.map(accessDoc => (
                        <div name={accessDoc._id}>
                            <AccessDocument access_document_info={accessDoc} admin_mode={admin_mode} />
                        </div>
                    ))}
                </div>
            }
        </div>
    );
}

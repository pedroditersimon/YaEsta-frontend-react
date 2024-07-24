import { useState, useEffect } from "react";
import apiClient from "../../Services/ApiClient/apiClient.mjs";

import "./ChannelAccessDocumentList.css";
import {AccessDocument} from "./AccessDocument.mjs";

export function AccessDocumentList({ documents=[], admin_mode=false }) {
    const [accessDocuments, setAccessDocuments] = useState([]);

    if (documents.length > 0 && accessDocuments.length == 0)
    {
        setAccessDocuments(documents);
    }

    if (accessDocuments.length == 0) {
        return(<span className="small_text">No hay nada que mostrar</span>);
    }

    return (
        <div className="rows">
            <div className='rows center'>
                {accessDocuments.map(accessDoc => (
                    <div name={accessDoc._id}>
                        <AccessDocument access_document_info={accessDoc} admin_mode={admin_mode} />
                    </div>
                ))}
            </div>
        </div>
    );
}

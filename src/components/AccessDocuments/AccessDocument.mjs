import { useState } from "react";
import apiClient from "../../Services/ApiClient/apiClient.mjs";
import QRCode from "react-qr-code";

import "./AccessDocument.css";

const trigger_url = "https://yaesta-frontend-react.onrender.com/access_documents/trigger";
export function AccessDocument({ access_document_info }) {
    const [accessDocument, setAccessDocument] = useState(access_document_info);
    const [ isDeleted, setIsDeleted ] = useState(false);

    async function handleGetClick() {
        setAccessDocument({});
        const result = await apiClient.getAccessDocumentByID(accessDocument._id);
        setAccessDocument(result);
    }

    async function handleDeleteClick() {
        const result = await apiClient.deleteAccessDocument(accessDocument._id);
        setIsDeleted(result);
    }

    if (isDeleted) {
        return (<span className="deleted_message">[Deleted]</span>);
    }

    return (
        <div className="container columns center">
            <div className="columns less_gap small_text">
                <span className="bold">AccessDocument</span>
                <span className="">ID: {accessDocument._id}</span>
                <span className="">creation_date: {accessDocument.creation_date}</span>
                <span className="">enabled: {accessDocument.enabled? 'Yes' : 'No'}</span>
                <span className="">requires_approval: {accessDocument.requires_approval? 'Yes' : 'No'}</span>
                <span className="">action_type: {accessDocument.action_type}</span>
                {accessDocument.action_type === "create" &&
                    <span className="">Channel Title Template: {accessDocument.channel_title_template}</span>
                }
                {accessDocument.action_type === "subscribe" &&
                    <span className="">Target Channel ID: {accessDocument.target_channel_id}</span>
                }
            </div>
            <div className="rows">
                <button className="accept_btn" onClick={handleGetClick}>Refresh</button>
                <button className="cancel_btn" onClick={handleDeleteClick}>Borrar</button>
            </div>
            {accessDocument._id && accessDocument.enabled ? (
                <QRCode value={`${trigger_url}/${accessDocument._id}`} />
            ) : (
                <span>QR Code</span>
            )}
        </div>
    );
}

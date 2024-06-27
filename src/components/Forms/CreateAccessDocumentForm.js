import apiClient from "../../Services/ApiClient/apiClient.mjs";
import { useState } from "react";
import { useFormCheckbox, useFormInput } from "../../hooks/useFormInput";
import './CreateAccessDocumentForm.css';

import { useSearchParams } from "react-router-dom";

export function CreateAccessDocumentForm() {
    const [isLoading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [searchParams] = useSearchParams();

    const target_channel_id = searchParams.get("target_channel_id");

    const enabledInput = useFormCheckbox(true, isLoading);
    const requiresApprovalInput = useFormCheckbox(false, isLoading);
    const actionTypeInput = useFormInput('subscribe', isLoading);
    const targetChannelIDInput = useFormInput(target_channel_id, isLoading);
    const channelTitleTemplateInput = useFormInput('New Channel {index}', isLoading);

    async function handleClick() {
        setLoading(true);
        setErrorMessage(null);

        try {
            const accessDocumentPayload = {
                enabled: enabledInput.value,
                requires_approval: requiresApprovalInput.value,
                action_type: actionTypeInput.value,
                target_channel_id: targetChannelIDInput.value,
                channel_title_template: channelTitleTemplateInput.value,
            };
            
            const response = await apiClient.createAccessDocument(accessDocumentPayload);

            if (response && response.isValid && response.isValid())
            {
                enabledInput.clear();
                requiresApprovalInput.clear();
                actionTypeInput.clear();
                targetChannelIDInput.clear();
                channelTitleTemplateInput.clear();
            }
            else {
                setErrorMessage("Failed to create access document. Please try again.");
            }
        } catch (error) {
            setErrorMessage(`Error: ${error.message}`);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="container columns center">
            <h1 className="title">Crear un Documento de acceso</h1>
            <div className="rows center less_gap">
                <label htmlFor="enabled">Enabled</label>
                <input type="checkbox" id="enabled" {...enabledInput} />
            </div>
            <div className="rows center less_gap">
                <label htmlFor="requires_approval">Requires Approval</label>
                <input type="checkbox" id="requires_approval" {...requiresApprovalInput} />
            </div>
            <div className="columns less_gap">
                <label>Action type</label>
                <select id="action-type" {...actionTypeInput} >
                    <option value="create">Create</option>
                    <option value="subscribe">Subscribe</option>
                </select>
            </div>
            {actionTypeInput.value === "subscribe" &&
                <input placeholder="Target Channel ID" {...targetChannelIDInput} />
            }
            {actionTypeInput.value === "create" &&
                <input placeholder="Channel Title Template" {...channelTitleTemplateInput} />
            }
            <button className="accept_btn" disabled={isLoading} onClick={handleClick}>Crear</button>
            {isLoading && <p className="loading_text">Loading...</p>}
            {errorMessage && <p className="error_text">{errorMessage}</p>}
        </div>
    );
}

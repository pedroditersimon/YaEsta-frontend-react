import apiClient from "../../Services/ApiClient/apiClient.mjs";
import { useState } from "react";
import { useFormInput } from "../../hooks/useFormInput";
import './CreateChannelEventForm.css';

import { useSearchParams } from "react-router-dom";

export function CreateChannelEventForm() {
    const [isLoading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [searchParams] = useSearchParams();

    const channel_id = searchParams.get("channel_id");
    
    const channelIDInput = useFormInput(channel_id, isLoading);
    const titleInput = useFormInput('', isLoading);
    const descriptionInput = useFormInput('', isLoading);
    const actionDateInput = useFormInput('', isLoading);
    const reminderDateInput = useFormInput('', isLoading);

    async function handleClick() {
        setLoading(true);
        setErrorMessage(null);

        try {
            const eventPayload = {
                channel_id: channelIDInput.value,
                action_date: new Date(actionDateInput.value).toUTCString(),
                reminder_date: new Date(reminderDateInput.value).toUTCString(),
                title: titleInput.value,
                description: descriptionInput.value,
            };
            
            const response = await apiClient.createNewEvent(...eventPayload);

            if (response && response.isValid()) {
                channelIDInput.clear();
                titleInput.clear();
                descriptionInput.clear();
                actionDateInput.clear();
                reminderDateInput.clear();
            } else {
                setErrorMessage("Failed to create event. Please try again.");
            }
        } catch (error) {
            setErrorMessage(`Error: ${error.message}`);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="container columns center">
            <h1 className="title">Crear un Evento</h1>
            <input placeholder="Channel ID" {...channelIDInput} />
            <input placeholder="Title" {...titleInput} />
            <input placeholder="Description" {...descriptionInput} />
            <div className="columns less_gap">
                <label htmlFor="action-date">Action Date</label>
                <input type="datetime-local" id="action-date" {...actionDateInput} />
            </div>
            <div className="columns less_gap">
                <label htmlFor="reminder-date">Reminder Date</label>
                <input type="datetime-local" id="reminder-date" {...reminderDateInput} />
            </div>
            <button className="accept_btn" disabled={isLoading} onClick={handleClick}>Crear</button>
            {isLoading && <p className="loading_text">Loading...</p>}
            {errorMessage && <p className="error_text">{errorMessage}</p>}
        </div>
    );
}

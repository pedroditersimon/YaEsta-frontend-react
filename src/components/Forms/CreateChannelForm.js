import apiClient from "../../Services/ApiClient/apiClient.mjs";
import { useState, useEffect } from "react";
import {useFormInput, useFormCheckbox} from "../../hooks/useFormInput";

import './CreateChannelForm.css';

export function CreateChannelForm() {
    const [isLoading, setLoading] = useState(false);
    const titleInput = useFormInput('', isLoading);
    const publicInput = useFormCheckbox('', isLoading);

    async function handleClick() {
        setLoading(true);
        const channel = await apiClient.createNewChannel({ title: titleInput.value, isPublic: publicInput.value });

        if (channel.isValid()) {
            titleInput.clear();
            publicInput.clear();
        }

        setLoading(false);
    }

    return (
        <div className="container columns center">
            <h1 className="title">Crear un Canal</h1>
            <input placeholder="Title" {...titleInput} />
            <div className="rows center less_gap">
                <label for="isPublicCheckbox" >IsPublic</label>
                <input id="isPublicCheckbox" type="checkbox" {...publicInput} />
            </div>
            <button className="accept_btn" disabled={isLoading} onClick={handleClick}>Crear</button>
            {isLoading && <p className="loading-text">Loading...</p>}
        </div>
    );
}
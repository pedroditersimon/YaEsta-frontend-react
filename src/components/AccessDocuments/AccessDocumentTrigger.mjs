import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import apiClient from '../../Services/ApiClient/apiClient.mjs';

export function AccessDocumentTrigger() {
    const { access_document_id } = useParams();
    const navigate = useNavigate();

    // State to manage the API call status
    const [status, setStatus] = useState('loading'); // 'loading', 'success', 'error'
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                setStatus('loading');
                // Trigger the AccessDocument and expect a boolean result
                const result = await apiClient.triggerAccessDocument(access_document_id);

                // Check the result and update status
                if (result) {
                    setStatus('success');
                } else {
                    setStatus('error');
                    setError('Failed to trigger the document'); // Custom error message
                }
            } catch (error) {
                console.error('Failed to trigger access document', error);
                setStatus('error');
                setError(error.message); // Set the error message to display
            }
        }

        fetchData();
    }, [access_document_id]);

    // Function to handle manual redirection
    const handleRedirect = () => {
        navigate('/channels/my');
    };

    return (
        <div className="status-container">
            {status === 'loading' && <p>Loading...</p>}
            {status === 'error' && (
                <div>
                    <p>Error: {error}</p>
                </div>
            )}
            {status === 'success' && <p>Document triggered successfully.</p>}
            <button className="accept_btn" onClick={handleRedirect}>Go to My Channels</button>
        </div>
    );
}

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const CancellationPolicyPage = () => {
    const { id } = useParams();
    const adminId=id;
        const [cancellationContent, setCancellationContent] = useState('');

    useEffect(() => {
        if (adminId) {
            const fetchCancellationContent = async () => {
                try {
                    const response = await axios.get(`http://localhost:5001/api/policy/cancellation/${adminId}`);
                    setCancellationContent(response.data.content || ''); // Set content if available
                } catch (error) {
                    console.error('Error fetching Cancellation Policy content:', error);
                }
            };

            fetchCancellationContent();
        }
    }, [adminId]);

    return (
        <div className="p-20">
            <h1 className="text-2xl font-bold mb-6">Cancellation Policy</h1>
            <div
                className="prose"
                dangerouslySetInnerHTML={{ __html: cancellationContent }}
            />
        </div>
    );
};

export default CancellationPolicyPage;

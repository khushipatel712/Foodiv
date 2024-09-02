import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const PrivacyPolicyPage = () => {
    const { id } = useParams();
    const adminId=id;
    const [privacyContent, setPrivacyContent] = useState('');

    useEffect(() => {
        if (adminId) {
            const fetchPrivacyContent = async () => {
                try {
                    const response = await axios.get(`http://localhost:5001/api/policy/privacy/${adminId}`);
                    setPrivacyContent(response.data.content || ''); // Set content if available
                } catch (error) {
                    console.error('Error fetching Privacy Policy content:', error);
                }
            };

            fetchPrivacyContent();
        }
    }, [adminId]);

    return (
        <div className="p-20">
            <h1 className="text-2xl font-bold mb-6">Privacy Policy</h1>
            <div
                className="prose"
                dangerouslySetInnerHTML={{ __html: privacyContent }}
            />
        </div>
    );
};

export default PrivacyPolicyPage;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const TermsAndConditionsPage = () => {
    // Get adminId from route parameters
    const { id } = useParams();
    const adminId=id;
    const [termsContent, setTermsContent] = useState('');

    useEffect(() => {
        if (adminId) {
            const fetchTermsContent = async () => {
                try {
                    const response = await axios.get(`http://localhost:5001/api/policy/terms/${adminId}`);
                    setTermsContent(response.data.content || ''); // Set content if available
                } catch (error) {
                    console.error('Error fetching Terms and Conditions content:', error);
                }
            };

            fetchTermsContent();
        }
    }, [adminId]);

    return (
        <div className="p-20">
            <h1 className="text-2xl font-bold mb-6">Terms and Conditions</h1>
            <div
                className="prose"
                dangerouslySetInnerHTML={{ __html: termsContent }}
            />
        </div>
    );
};

export default TermsAndConditionsPage;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ShippingPolicyPage = () => {
    const { id } = useParams();
    const adminId=id;
    const [shippingContent, setShippingContent] = useState('');

    useEffect(() => {
        if (adminId) {
            const fetchShippingContent = async () => {
                try {
                    const response = await axios.get(`http://localhost:5001/api/policy/shipping/${adminId}`);
                    setShippingContent(response.data.content || ''); // Set content if available
                } catch (error) {
                    console.error('Error fetching Shipping Policy content:', error);
                }
            };

            fetchShippingContent();
        }
    }, [adminId]);

    return (
        <div className="p-20">
            <h1 className="text-2xl font-bold mb-6">Shipping Policy</h1>
            <div
                className="prose"
                dangerouslySetInnerHTML={{ __html: shippingContent }}
            />
        </div>
    );
};

export default ShippingPolicyPage;

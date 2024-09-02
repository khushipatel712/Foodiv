import React, { useState, useEffect } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from 'axios';
import { useGetProfileQuery } from '../../services/adminApi';
import Cookies from 'js-cookie';

const PoliciesAndTerms = () => {
    const token = Cookies.get('token');
    const { data: profileData } = useGetProfileQuery(token);
    const [termsContent, setTermsContent] = useState('');
    const [privacyContent, setPrivacyContent] = useState('');
    const [shippingContent, setShippingContent] = useState('');
    const [cancellationContent, setCancellationContent] = useState('');

    const adminId = profileData?.id;

    useEffect(() => {
        if (adminId) {
            const fetchData = async () => {
                try {
                    const [termsResponse, privacyResponse, shippingResponse, cancellationResponse] = await Promise.all([
                        axios.get(`http://localhost:5001/api/policy/terms/${adminId}`),
                        axios.get(`http://localhost:5001/api/policy/privacy/${adminId}`),
                        axios.get(`http://localhost:5001/api/policy/shipping/${adminId}`),
                        axios.get(`http://localhost:5001/api/policy/cancellation/${adminId}`),
                    ]);

                    setTermsContent(termsResponse.data.content || '');
                    setPrivacyContent(privacyResponse.data.content || '');
                    setShippingContent(shippingResponse.data.content || '');
                    setCancellationContent(cancellationResponse.data.content || '');

                } catch (error) {
                    console.error('Error fetching policy content:', error);
                }
            };

            fetchData();
        }
    }, [adminId]);

    const handleSave = (policyType) => {
        let apiUrl = '';

        switch (policyType) {
            case 'terms':
                
                apiUrl = 'http://localhost:5001/api/policy/terms';
                break;
            case 'privacy':
                apiUrl = 'http://localhost:5001/api/policy/privacy';
                break;
            case 'shipping':
                apiUrl = 'http://localhost:5001/api/policy/shipping';
                break;
            case 'cancellation':
                apiUrl = 'http://localhost:5001/api/policy/cancellation';
                break;
            default:
                return;
        }

        const formData = new FormData();

        // Append adminId and content to FormData
        if (adminId) {
            formData.append('adminId', adminId);
        }
        formData.append('policyType', policyType);

        switch (policyType) {
            case 'terms':
                formData.append('content', termsContent);
                break;
            case 'privacy':
                formData.append('content', privacyContent);
                break;
            case 'shipping':
                formData.append('content', shippingContent);
                break;
            case 'cancellation':
                formData.append('content', cancellationContent);
                break;
            default:
                break;
        }

        axios.post(apiUrl, formData)
            .then(response => {
                console.log(`${policyType} saved successfully:`, response.data);
            })
            .catch(error => {
                console.error(`Error saving ${policyType}:`, error);
            });
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Policies Management</h1>
            <div className="border border-gray-300 rounded-lg p-4">
                {/* Terms and Conditions */}
                <div className='mb-10'>
                    <h2 className="text-xl font-semibold mb-4">Terms and Conditions</h2>
                    <CKEditor
                        editor={ClassicEditor}
                        data={termsContent}
                        onChange={(event, editor) => setTermsContent(editor.getData())}
                        className="border rounded-lg mb-4"
                    />
                    <div className="flex justify-start mt-2">
                        <button
                            onClick={() => handleSave('terms')}
                            className="bg-gray-500 text-white px-3 py-2 text-xs font-medium rounded-xl hover:bg-gray-700"
                        >
                            Save Changes
                        </button>
                    </div>
                </div>

                {/* Privacy Policy */}
                <div className='mb-10'>
                    <h2 className="text-xl font-semibold mb-4">Privacy Policy</h2>
                    <CKEditor
                        editor={ClassicEditor}
                        data={privacyContent}
                        onChange={(event, editor) => setPrivacyContent(editor.getData())}
                        className="border rounded-lg mb-4"
                    />
                    <div className="flex justify-start mt-2">
                        <button
                            onClick={() => handleSave('privacy')}
                            className="bg-gray-500 text-white px-3 py-2 text-xs font-medium rounded-xl hover:bg-gray-700"
                        >
                            Save Changes
                        </button>
                    </div>
                </div>

                {/* Shipping Policy */}
                <div className='mb-10'>
                    <h2 className="text-xl font-semibold mb-4">Shipping Policy</h2>
                    <CKEditor
                        editor={ClassicEditor}
                        data={shippingContent}
                        onChange={(event, editor) => setShippingContent(editor.getData())}
                        className="border rounded-lg mb-4"
                    />
                    <div className="flex justify-start mt-2">
                        <button
                            onClick={() => handleSave('shipping')}
                            className="bg-gray-500 text-white px-3 py-2 text-xs font-medium rounded-xl hover:bg-gray-700"
                        >
                            Save Changes
                        </button>
                    </div>
                </div>

                {/* Cancellation Policy */}
                <div className='mb-10'>
                    <h2 className="text-xl font-semibold mb-4">Cancellation Policy</h2>
                    <CKEditor
                        editor={ClassicEditor}
                        data={cancellationContent}
                        onChange={(event, editor) => setCancellationContent(editor.getData())}
                        className="border rounded-lg mb-4"
                    />
                    <div className="flex justify-start mt-2">
                        <button
                            onClick={() => handleSave('cancellation')}
                            className="bg-gray-500 text-white px-3 py-2 text-xs font-medium rounded-xl hover:bg-gray-700"
                        >
                            Save Changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PoliciesAndTerms;

import React, { useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from 'axios';

const PoliciesAndTerms = () => {
    const [termsContent, setTermsContent] = useState('');
    const [privacyContent, setPrivacyContent] = useState('');
    const [shippingContent, setShippingContent] = useState('');
    const [cancellationContent, setCancellationContent] = useState('');

    const handleSave = (policyType) => {
        const data = {};
        if (policyType === 'terms') data.terms = termsContent;
        if (policyType === 'privacy') data.privacy = privacyContent;
        if (policyType === 'shipping') data.shipping = shippingContent;
        if (policyType === 'cancellation') data.cancellation = cancellationContent;

        axios.post('http://localhost:5000/api/policies', data)
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

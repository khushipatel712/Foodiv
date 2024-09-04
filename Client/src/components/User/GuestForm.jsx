import React, { useEffect, useState } from 'react';
import { FaArrowLeft } from "react-icons/fa6";
import Cookies from 'js-cookie';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { saveContactInformationToDB, getContactInformationFromDB } from './IndexdDBUtils'; // Adjust the path as necessary

const GuestForm = ({ goBack }) => {
    const [showBackButton, setShowBackButton] = useState(false);
    const [userData, setUserData] = useState({
        name: '',
        mobile: '',
        email: '',
        instruction: '',
    });

    const { id } = useParams();
    // console.log(id)
    // const adminId = id;
    const token = Cookies.get('userToken');
    // console.log(token)

  useEffect(() => {
    const fetchUserData = async () => {
        try {
            console.log("Fetching user data");
            
            if (!token) {
                setShowBackButton(true);
                console.log("Token is not available");
                return; // Exit early if no token
            }

            const storedData = await getContactInformationFromDB();
            console.log("Stored data:", storedData);

            if (storedData && storedData.contactInfo) {
                const { name, mobile, email, instruction } = storedData.contactInfo;
                console.log("Using stored data:", { name, mobile, email, instruction });
                setUserData({ name, mobile, email, instruction });
            } else {
                console.log("No stored data, fetching from API");
                const response = await axios.get(`http://localhost:5001/api/user/get/${id}`, {
                    headers: {
                        Authorization: token,
                    },
                });
                
                console.log("API Response Data:", response.data);
                
                const { name, mobile, email } = response.data;
                const newUserData = { name, mobile, email, instruction: '' };
                setUserData(newUserData);
                
                // Save fetched data to IndexedDB
                await saveContactInformationToDB({ id: 'contactInfo', contactInfo: newUserData });
            }
        } catch (error) {
            console.error("Error in fetchUserData:", error);
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.error("API error response:", error.response.data);
                console.error("API error status:", error.response.status);
                console.error("API error headers:", error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                console.error("No response received:", error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.error("Error setting up request:", error.message);
            }
            // Optional: Reset user data if an error occurs
            setUserData({ name: '', mobile: '', email: '', instruction: '' });
        }
    };

    fetchUserData();
}, [id, token]);


    // Handle form change and update IndexedDB
    const handleChange = async (e) => {
        const { id, value } = e.target;
        const updatedUserData = { ...userData, [id]: value };
    
        setUserData(updatedUserData);
    
        try {
            await saveContactInformationToDB(updatedUserData); // Update IndexedDB
        } catch (error) {
            console.error("Failed to save contact information:", error);
        }
    };

    return (
        <div className="w-full lg:w-[70%] bg-white p-3 lg:p-10 rounded-lg shadow">
            <div className='flex flex-row gap-4 items-center'>
                {showBackButton && (
                    <div>
                        <button
                            className="hover:text-blue-700 mb-4"
                            onClick={goBack}
                        >
                            <FaArrowLeft />
                        </button>
                    </div>
                )}
                <div className="text-lg font-medium mb-4">Contact Information</div>
            </div>
            <form>
                <div className="mb-4 flex">
                    <div className='flex sm:flex-row flex-col gap-4 w-full justify-between'>
                        <div className='sm:w-1/2 w-full'>
                        <div className='flex'>
                            <label className="block text-gray-700 font-semibold text-xs mb-2" htmlFor="name">Name</label>
                            <span className="text-red-400 ml-1 font-bold">*</span>
                            </div>
                            <input
                                type="text"
                                id="name"
                                className="w-full px-3 py-2 border rounded text-sm"
                                placeholder="Enter your name"
                                value={userData.name || ''}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className='sm:w-1/2 w-full'>
                        <div className='flex'>
                            <label className="block text-gray-700 font-semibold mb-2 text-xs" htmlFor="mobile">Mobile</label>
                            <span className="text-red-400 ml-1 font-bold">*</span>
                            </div>
                            <input
                                type="text"
                                id="mobile"
                                className="w-full text-sm px-3 py-2 border rounded"
                                placeholder="Enter your mobile number"
                                value={userData.mobile || ''}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                </div>
                <div className="mb-4 sm:w-1/2 w-full">
                    <label className="block text-gray-700 text-xs font-semibold mb-2" htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        className="w-full px-3 py-2 text-sm border rounded"
                        placeholder="Enter your email"
                        value={userData.email || ''}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold sm:text-lg text-sm mb-2" htmlFor="instruction">Instruction</label>
                    <textarea
                        type="text"
                        id="instruction"
                        className="w-full px-3 py-2 border rounded text-sm"
                        placeholder=' "Any suggestion? we will pass on... '
                        value={userData.instruction || ''}
                        onChange={handleChange}
                    />
                </div>
            </form>
        </div>
    );
};

export default GuestForm;

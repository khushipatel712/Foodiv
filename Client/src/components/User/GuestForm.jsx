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
    const adminId = id;

    useEffect(() => {
        const token = Cookies.get('userToken');

        if (!token) {
            setShowBackButton(true);
            return;
        }

        const fetchUserData = async () => {
            try {
                // Check IndexedDB first
                const storedData = await getContactInformationFromDB();
                
                if (storedData) {
                    // If data exists in IndexedDB, use it
                    const { name, mobile, email, instruction } = storedData;
                    setUserData({ name, mobile, email, instruction });
                } else {
                  
                    const response = await axios.get(`http://localhost:5001/api/user/get/${id}`, {
                        headers: {
                            Authorization: token,
                        },
                    });
    
                    const { name, mobile, email } = response.data;
                    const newUserData = { name, mobile, email, instruction: '' };
                    setUserData(newUserData);
    
                    // Save fetched data to IndexedDB
                    await saveContactInformationToDB(newUserData);
                }
            } catch (error) {
                console.error("Failed to fetch user data:", error);
            }
        };
    
        fetchUserData();
    }, [adminId]);

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
        <div className="w-full lg:w-[70%] bg-white p-5 lg:p-10 rounded-lg shadow">
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
                    <div className='flex flex-row gap-4 w-full justify-between'>
                        <div className='w-1/2'>
                            <label className="block text-gray-700 font-semibold text-xs mb-2" htmlFor="name">Name</label>
                            <input
                                type="text"
                                id="name"
                                className="w-full px-3 py-2 border rounded text-sm"
                                placeholder="Enter your name"
                                value={userData.name || ''}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='w-1/2'>
                            <label className="block text-gray-700 font-semibold mb-2 text-xs" htmlFor="mobile">Mobile</label>
                            <input
                                type="text"
                                id="mobile"
                                className="w-full text-sm px-3 py-2 border rounded"
                                placeholder="Enter your mobile number"
                                value={userData.mobile || ''}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </div>
                <div className="mb-4 w-1/2">
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
                    <label className="block text-gray-700 font-semibold text-lg mb-2" htmlFor="instruction">Instruction</label>
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

import React, { useState, useEffect, useLayoutEffect } from 'react';
import { GrSquare } from "react-icons/gr";
import GuestForm from './GuestForm';
import LoginForm from './LoginForm';
import RegisterModal from './RegisterModal';
import Cookies from 'js-cookie';
import { getDrawerDataFromDB, addPaymentTypeToDB, getPaymentTypeFromDB, getContactInformationFromDB, updateDrawerDataInDB } from './IndexdDBUtils';

const Checkout = () => {
    const [formType, setFormType] = useState(null);
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
    const [drawerData, setDrawerData] = useState({ cartItems: [], totalAmount: 0, orderType: null });
    const [paymentType, setPaymentType] = useState('');
    const [contactInfo, setContactInfo] = useState(null);
    
    useEffect(() => {
        const token = Cookies.get('userToken');
        if (token) {
            setFormType('guest');
        }
    }, []);

    // Fetch drawer data from IndexedDB when the component mounts
    useEffect(() => {
        const fetchDrawerData = async () => {
            const data = await getDrawerDataFromDB();
            setDrawerData(data); // Update state with the retrieved data
        };

        fetchDrawerData();
    }, []);

    useLayoutEffect(() => {
       if(paymentType !=null && paymentType !=''){
           savePaymentType();
       }
    }, [paymentType]);

    const savePaymentType = async () => {
        if (paymentType !== null) {
            await addPaymentTypeToDB(paymentType);
        }
    };
    
    const handlePaymentTypeChange = (type) => {
        setPaymentType(type);
        savePaymentType();
    };

    const fetchPaymentType = async () => {
        try {
            const { paymentType } = await getPaymentTypeFromDB();
            if (paymentType != null && paymentType !== '' && paymentType !== undefined) {
                setPaymentType(paymentType);
            }
        } catch (error) {
            console.error("Failed to fetch payment type", error);
        }
    };

    const fetchContactInformation = async () => {
        try {
            const contactInfo = await getContactInformationFromDB();
            setContactInfo(contactInfo);
        } catch (error) {
            console.error("Failed to fetch contact information", error);
        }
    };

    const handlePlaceOrder = async () => {
        try {
            // Fetch payment type and contact information when placing the order
            await fetchPaymentType();
            await fetchContactInformation();

            if (paymentType === '') {
                throw new Error('Please select a payment method.');
            }

            await updateDrawerDataInDB(drawerData.cartItems, drawerData.totalAmount);

            // Additional logic to handle after updating the drawer data, like navigating to a confirmation page
            console.log('Order placed successfully!');
        } catch (error) {
            console.error("Failed to place the order", error.message || error);
        }
    };

    const handleRegisterClick = () => {
        setIsRegisterModalOpen(true);
    };

    const handleCloseRegisterModal = () => {
        setIsRegisterModalOpen(false);
    };

    return (
        <>
            <div className="lg:flex lg:justify-center lg:items-start p-10 lg:pl-40">
                {!formType ? (
                    <div className="w-full lg:w-[70%] bg-white lg:p-10 p-5 border shadow">
                        <div className="text-xl font-semibold mb-4">Account</div>
                        <p className="text-gray-600 mb-4">Select the option to check out with :</p>

                        {/* Buttons for Guest and Login */}
                        <div className="flex space-x-4 mb-4">
                            <button onClick={() => setFormType('guest')} className="border w-1/2 lg:text-base text-sm border-orange-500 text-orange-500 lg:px-6 px-4 py-2 rounded-lg hover:bg-orange-500 hover:text-white">
                                Continue as a guest
                            </button>
                            <button onClick={() => setFormType('login')} className="bg-orange-500 w-1/2 lg:text-base text-sm text-white lg:px-6 px-4 py-2 rounded-lg hover:bg-orange-600">
                                Login
                            </button>
                        </div>

                        <div className="flex items-center space-x-2">
                            <hr className="flex-grow border-gray-300" />
                            <span>OR</span>
                            <hr className="flex-grow border-gray-300" />
                        </div>

                        <div className="mt-4 flex justify-center">
                            <div className='lg:text-lg text-base'>Don't have an account? <button onClick={handleRegisterClick} className="text-white rounded-md py-2 px-4 text-sm bg-black font-semibold">Sign up</button></div>
                        </div>
                    </div>
                ) : formType === 'guest' ? (
                    <GuestForm goBack={() => setFormType(null)} />
                ) : (
                    <LoginForm goBack={() => setFormType(null)} />
                )}
                {/* Bill Summary Section */}
                <div className="w-full lg:w-[50%] mt-10 lg:mt-0 lg:ml-10 bg-white p-6">

                    <div className='border-2 px-3 py-2 mb-4'>
                        {drawerData.cartItems.map((item, index) => (
                            <div key={index} className="flex justify-between items-center ">
                                <div className="flex items-center py-1">
                                    <GrSquare className={`mr-2 size-3 ${item.veg ? 'text-green-500' : 'text-red-500'}`} />
                                    <span className='text-sm'>{item.name} x {item.quantity}</span>
                                </div>
                                <span className='text-sm'>₹{item.price.toFixed(2)}</span>
                            </div>
                        ))}
                    </div>

                    <div className='px-3 py-2 mb-4 shadow-lg'>
                        <div className="flex justify-between items-center">
                            <span className="text-gray-600 text-sm">Items Total</span>
                            <span className="font-semibold">₹{drawerData.totalAmount.toFixed(2)}</span>
                        </div>
                        <hr className='w-full bg-slate-300 my-2'></hr>
                        <div className="flex justify-between items-center">
                            <span className="text-lg text-gray-700 font-medium">Total</span>
                            <span className="text-lg font-medium text-gray-700">₹{drawerData.totalAmount.toFixed(2)}</span>
                        </div>
                    </div>

                    {/* Show the orderType if it exists */}
                    {drawerData.orderType && (
                        <div className="mb-4">
                            <span className="font-semibold">Order Type: </span>
                            <span>{drawerData.orderType}</span>
                        </div>
                    )}

                    {/* Payment Option */}
                    <div className="flex items-center space-x-2 mb-6">
                        <input 
                            type="radio" 
                            id="cashOnDelivery" 
                            name="paymentMode" 
                            checked={paymentType === 'cashOnDelivery'}
                            onChange={() => handlePaymentTypeChange('cashOnDelivery')}
                            className="text-orange-500 bg-orange-500" 
                        />
                        <label htmlFor="cashOnDelivery">Cash on Delivery</label>
                    </div>

                    {/* Place Order Button */}
                    <button
                        onClick={handlePlaceOrder}
                        disabled={paymentType !== 'cashOnDelivery'}
                        className={`w-full py-2 rounded-md text-white ${paymentType === 'cashOnDelivery' ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-300 cursor-not-allowed'}`}
                    >
                        Place Order
                    </button>
                </div>
            </div>
            {isRegisterModalOpen && (
                <RegisterModal onClose={handleCloseRegisterModal} />
            )}
        </>
    );
};

export default Checkout;

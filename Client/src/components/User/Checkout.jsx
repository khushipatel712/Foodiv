// import React, { useState, useEffect, useLayoutEffect } from 'react';
// import { GrSquare } from "react-icons/gr";
// import { replace, useNavigate } from 'react-router-dom';
// import GuestForm from './GuestForm';
// import LoginForm from './LoginForm';
// import RegisterModal from './RegisterModal';
// import Cookies from 'js-cookie';
// import { getDrawerDataFromDB, addPaymentTypeToDB, getPaymentTypeFromDB, getContactInformationFromDB, updateDrawerDataInDB, clearMultipleStoresFromDB, getOrderTypeFromDB } from './IndexdDBUtils';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';

// const Checkout = () => {
//     const [formType, setFormType] = useState(null);
//     const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
//     const [drawerData, setDrawerData] = useState({ cartItems: [], totalAmount: 0, orderType: null });
//     const [paymentType, setPaymentType] = useState('');
//     const [contactInfo, setContactInfo] = useState(null);
//     const {id}=useParams()
//     const navigate =useNavigate();
//     // console.log(id);

//     useEffect(() => {
//         const token = Cookies.get('userToken');
//         if (token) {
//             setFormType('guest');
//         }
//     }, []);

//     // Fetch drawer data from IndexedDB when the component mounts
//     useEffect(() => {
//         const fetchDrawerData = async () => {
//             const data = await getDrawerDataFromDB();
//             setDrawerData(data); // Update state with the retrieved data
//         };

//         fetchDrawerData();
//     }, []);

//     useLayoutEffect(() => {
//        if(paymentType !=null && paymentType !=''){
//            savePaymentType();
//        }
//     }, [paymentType]);

//     const savePaymentType = async () => {
//         if (paymentType !== null) {
//             await addPaymentTypeToDB(paymentType);
//         }
//     };

//     const handlePaymentTypeChange = (type) => {
//         setPaymentType(type);
//         savePaymentType();
//     };

//     const fetchPaymentType = async () => {
//         try {
//             const { paymentType } = await getPaymentTypeFromDB();
//             if (paymentType != null && paymentType !== '' && paymentType !== undefined) {
//                 setPaymentType(paymentType);
//             }
//         } catch (error) {
//             console.error("Failed to fetch payment type", error);
//         }
//     };

//     const fetchContactInformation = async () => {
//         try {
//             const contactInfo = await getContactInformationFromDB();
//             setContactInfo(contactInfo);
//         } catch (error) {
//             console.error("Failed to fetch contact information", error);
//         }
//     };

//     const handlePlaceOrder = async () => {
//         try {
//             // Fetch payment type and contact information when placing the order
//             await fetchPaymentType();
//             await fetchContactInformation();

//             if (paymentType === '') {
//                 throw new Error('Please select a payment method.');
//             }

//             await updateDrawerDataInDB(drawerData.cartItems, drawerData.totalAmount);

//             try{

//                 const contact=await getContactInformationFromDB();

//                 // console.log("getcontact:",contact)


//     if (contact==undefined) {
//         alert("Name and email are required.");
//         return; 
//     }

//     if(!contact.contactInfo.name || !contact.contactInfo.mobile ){
//         alert("Name and Mobile Number are required");
//         return;
//     }
//                 const paymentType= await getPaymentTypeFromDB();
//                 if (paymentType === '') {
//                     alert('Please select a payment method.');
//                 }

//                 const orderType= await getOrderTypeFromDB();
//                 if(orderType === ''){
//                     alert('Please select a payment method.'); 
//                 }

//                 const data=await getDrawerDataFromDB();
//                 await axios.post('http://localhost:5001/api/userorder',{ cartItem:data, contactInfo:contact, paymentInfo:paymentType, orderDetail:orderType, adminId:id })
//             }catch(err){
//                 console.log(err);
//             }
//             // Additional logic to handle after updating the drawer data, like navigating to a confirmation page
//             console.log('Order placed successfully!');
//             navigate(`/${id}/user/confirmation`);

//             // await clearMultipleStoresFromDB(['contactInformation', 'drawerData', 'orderDetails', 'paymentMode']);
//         } catch (error) {
//             console.error("Failed to place the order", error.message || error);
//         }
//     };

//     // console.log(drawerData)

//     const handleRegisterClick = () => {
//         setIsRegisterModalOpen(true);
//     };

//     const handleCloseRegisterModal = () => {
//         setIsRegisterModalOpen(false);
//     };

//     return (
//         <>
//             <div className="lg:flex lg:justify-center lg:items-start p-10 lg:pl-40">
//                 {!formType ? (
//                     <div className="w-full lg:w-[70%] bg-white lg:p-10 p-5 border shadow">
//                         <div className="text-xl font-semibold mb-4">Account</div>
//                         <p className="text-gray-600 mb-4">Select the option to check out with :</p>

//                         {/* Buttons for Guest and Login */}
//                         <div className="flex space-x-4 mb-4">
//                             <button onClick={() => setFormType('guest')} className="border w-1/2 lg:text-base text-sm border-orange-500 text-orange-500 lg:px-6 px-4 py-2 rounded-lg hover:bg-orange-500 hover:text-white">
//                                 Continue as a guest
//                             </button>
//                             <button onClick={() => setFormType('login')} className="bg-orange-500 w-1/2 lg:text-base text-sm text-white lg:px-6 px-4 py-2 rounded-lg hover:bg-orange-600">
//                                 Login
//                             </button>
//                         </div>

//                         <div className="flex items-center space-x-2">
//                             <hr className="flex-grow border-gray-300" />
//                             <span>OR</span>
//                             <hr className="flex-grow border-gray-300" />
//                         </div>

//                         <div className="mt-4 flex justify-center">
//                             <div className='lg:text-lg text-base'>Don't have an account? <button onClick={handleRegisterClick} className="text-white rounded-md py-2 px-4 text-sm bg-black font-semibold">Sign up</button></div>
//                         </div>
//                     </div>
//                 ) : formType === 'guest' ? (
//                     <GuestForm goBack={() => setFormType(null)} />
//                 ) : (
//                     <LoginForm goBack={() => setFormType(null)} />
//                 )}
//                 {/* Bill Summary Section */}
//                 <div className="w-full lg:w-[50%] mt-10 lg:mt-0 lg:ml-10 bg-white p-3 lg:p-6">

//                     <div className='border-2 px-3 py-2 mb-4'>
//                         {drawerData.cartItems.map((item, index) => (
//                             <div key={index} className="flex justify-between items-center ">
//                                 <div className="flex items-center py-1">
//                                     <GrSquare className={`mr-2 size-3 ${item.veg ? 'text-green-500' : 'text-red-500'}`} />
//                                     <span className='text-sm'>{item.name} x {item.quantity}</span>
//                                 </div>
//                                 <span className='text-sm'>₹{item.price.toFixed(2)}</span>
//                             </div>
//                         ))}
//                     </div>

//                     <div className='px-3 py-2 mb-5 shadow-lg'>
//                         <div className="flex justify-between items-center">
//                             <span className="text-gray-600 text-base">Items Total</span>
//                             <span className="font-semibold">₹{drawerData.totalAmount.toFixed(2)}</span>
//                         </div>
//                         <hr className='w-full bg-slate-300 my-2'></hr>
//                         <div className="flex justify-between items-center">
//                             <span className="text-lg text-gray-700 font-medium">Total</span>
//                             <span className="text-lg font-medium text-gray-700">₹{drawerData.totalAmount.toFixed(2)}</span>
//                         </div>
//                     </div>

//                     {/* Show the orderType if it exists */}
//                     {drawerData.orderType && (
//                         <div className="mb-4">
//                             <span className="font-semibold">Order Type: </span>
//                             <span>{drawerData.orderType}</span>
//                         </div>
//                     )}

//                     {/* Payment Option */}
//                     <div className="flex items-center space-x-2 mb-6">
//                         <input 
//                             type="radio" 
//                             id="cashOnDelivery" 
//                             name="paymentMode" 
//                             checked={paymentType === 'cashOnDelivery'}
//                             onChange={() => handlePaymentTypeChange('cashOnDelivery')}
//                             className="text-orange-500 bg-orange-500" 
//                         />
//                         <label htmlFor="cashOnDelivery">Cash on Delivery</label>
//                     </div>

//                     {/* Place Order Button */}
//                     <button
//                         onClick={handlePlaceOrder}
//                         disabled={paymentType !== 'cashOnDelivery'}
//                         className={`w-full py-2 rounded-md text-white ${paymentType === 'cashOnDelivery' ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-300 cursor-not-allowed'}`}
//                     >
//                         Place Order
//                     </button>
//                 </div>
//             </div>
//             {isRegisterModalOpen && (
    //                 <RegisterModal onClose={handleCloseRegisterModal} />
    //             )}
    //         </>
    //     );
    // };
    
    // export default Checkout;
    
    
    
        // const initiateRazorpayPayment = async (orderData) => {
        //     try {
        //         // Create order on the server to get order_id
        //         const orderResponse = await axios.post('http://localhost:5001/api/userorder', {
        //             amount: orderData.totalAmount * 100,
        //             cartItem: drawerData.cartItems,
        //             totalAmount: drawerData.totalAmount,
        //             contactInfo: contactInfo.contactInfo,
        //             paymentInfo: paymentType,
        //             orderDetail: orderType,
        //             adminId: id,
        //         });
    
        //         // console.log(orderResponse.data)
    
        //         const { razorpayOrderId } = orderResponse.data;
    
        //         const options = {
        //             key: RAZORPAY_KEY_ID,
        //             amount: orderData.totalAmount * 100,
        //             currency: 'INR',
        //             name: 'Your Company Name',
        //             description: 'Order Payment',
        //             order_id: razorpayOrderId,
        //             handler: async function (response) {
        //                 console.log("Payment Response:", response);
        //                 // console.log(this.order_id)/
        //                 const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = response;
    
        //                 if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature) {
        //                     console.error("Missing payment details");
        //                     return;
        //                 }
        //                 try {
        //                     const paymentVerification = await axios.post('http://localhost:5001/api/verify-payment', {
        //                         razorpay_payment_id: response.razorpay_payment_id,
        //                         razorpay_order_id: response.razorpay_order_id,
        //                         razorpay_signature: response.razorpay_signature,
        //                     });
    
    
        //                     console.log("Payment Verification Response:", paymentVerification.data);
    
        //                     if (paymentVerification.status === 200 && paymentVerification.data.message === 'Payment verified successfully') {
        //                         orderData.paymentInfo = {
        //                             paymentType: 'razorpay',
        //                             paymentId: response.razorpay_payment_id,
        //                             orderId: response.razorpay_order_id,
        //                             signature: response.razorpay_signature,
        //                         };
        //                         await placeOrder(orderData);
        //                     } else {
        //                         alert('Payment verification failed. Please try again.');
        //                         setIsPlacingOrder(false);
        //                     }
        //                 } catch (error) {
        //                     console.error('Payment verification failed:', error);
        //                     alert('Payment verification failed. Please try again.');
        //                     setIsPlacingOrder(false);
        //                 }
        //             },
        //             prefill: {
        //                 name: orderData.contactInfo.name,
        //                 email: orderData.contactInfo.email,
        //                 contact: orderData.contactInfo.mobile,
        //             },
        //             notes: {
        //                 address: 'Your Company Address',
        //             },
        //             theme: {
        //                 color: '#3399cc',
        //             },
        //         };
    
        //         const rzp = new window.Razorpay(options);
        //         rzp.open();
        //     } catch (error) {
        //         console.error('Failed to initiate Razorpay payment:', error);
        //         alert('Failed to initiate payment. Please try again.');
        //         setIsPlacingOrder(false);
        //     }
        // };


        
        import React, { useState, useEffect, useLayoutEffect } from 'react';
        import { GrSquare } from "react-icons/gr";
        import { useNavigate, useParams } from 'react-router-dom';
        import GuestForm from './GuestForm';
        import LoginForm from './LoginForm';
        import RegisterModal from './RegisterModal';
        import Cookies from 'js-cookie';
        import axios from 'axios';
        import {
            getDrawerDataFromDB,
            addPaymentTypeToDB,
            getPaymentTypeFromDB,
            getContactInformationFromDB,
            updateDrawerDataInDB,
            clearMultipleStoresFromDB,
            getOrderTypeFromDB
        } from './IndexdDBUtils';
        
        const Checkout = () => {
            const [formType, setFormType] = useState(null);
            const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
            const [drawerData, setDrawerData] = useState({ cartItems: [], totalAmount: 0, orderType: null });
            const [paymentType, setPaymentType] = useState('');
            const [orderType, setOrderType] = useState('');
            const [contactInfo, setContactInfo] = useState(null);
            const [isPlacingOrder, setIsPlacingOrder] = useState(false);
            const { id } = useParams();
            const navigate = useNavigate();
        
            useEffect(() => {
                const token = Cookies.get('userToken');
                if (token) {
                    setFormType('guest');
                }
            }, []);
        
            useEffect(() => {
                const fetchInitialData = async () => {
                    const [drawerData, paymentType, orderType, contactInfo] = await Promise.all([
                        getDrawerDataFromDB(),
                        getPaymentTypeFromDB(),
                        getOrderTypeFromDB(),
                        getContactInformationFromDB()
                    ]);
        
                    setDrawerData(drawerData);
                    setPaymentType(paymentType?.paymentType || '');
                    setOrderType(orderType || '');
                    setContactInfo(contactInfo);
                };
        
                fetchInitialData();
            }, []);
        
            useLayoutEffect(() => {
                if (paymentType) {
                    addPaymentTypeToDB(paymentType);
                }
            }, [paymentType]);
        
            const handlePaymentTypeChange = (type) => {
                setPaymentType(type);
            };
        
            const handlePlaceOrder = async () => {
                setIsPlacingOrder(true);
        
                try {
                    // Fetch the latest data
                    const [latestPaymentType, latestOrderType, latestContactInfo] = await Promise.all([
                        getPaymentTypeFromDB(),
                        getOrderTypeFromDB(),
                        getContactInformationFromDB()
                    ]);
        
                    // Update state with the latest data
                    setPaymentType(latestPaymentType?.paymentType || '');
                    setOrderType(latestOrderType || '');
                    setContactInfo(latestContactInfo);
        
                    // Validate the data
                    if (!latestOrderType) {
                        alert('Please select an order type');
                        setIsPlacingOrder(false);
                        return;
                    }
        
                    if (!latestContactInfo?.contactInfo?.name || !latestContactInfo?.contactInfo?.mobile) {
                        alert("Name and Mobile Number are required.");
                        setIsPlacingOrder(false);
                        return;
                    }
        
                    if (!latestPaymentType?.paymentType) {
                        alert('Please select a payment method.');
                        setIsPlacingOrder(false);
                        return;
                    }
        
                    // Update drawer data
                    await updateDrawerDataInDB(drawerData.cartItems, drawerData.totalAmount);
        
                    const orderData = {
                        cartItems: drawerData.cartItems,
                        totalAmount: drawerData.totalAmount,
                        contactInfo: latestContactInfo.contactInfo,
                        paymentInfo: latestPaymentType.paymentType,
                        orderDetail: latestOrderType,
                        adminId: id,
                    };
        
                    if (latestPaymentType.paymentType === 'razorpay') {
                        await initiateRazorpayPayment(orderData);
                    } else if (latestPaymentType.paymentType === 'cashOnDelivery') {
                        await placeOrder(orderData);
                    }
        
                } catch (error) {
                    console.error("Failed to place the order", error.message || error);
                    alert('Failed to place the order. Please try again.');
                    setIsPlacingOrder(false);
                }
            };
    
    const initiateRazorpayPayment = async (orderData) => {
        try {
          // Step 1: Create Razorpay order
          const orderResponse = await axios.post('http://localhost:5001/api/create-razorpay-order', {
            amount: orderData.totalAmount * 100,
            cartItem: orderData.cartItems,
            totalAmount: orderData.totalAmount,
            contactInfo: orderData.contactInfo,
            paymentInfo: { paymentType: 'razorpay' }, // Adjusted paymentInfo
            orderDetail: orderData.orderDetail,
            adminId: orderData.adminId,
          });
      
          const { razorpayOrderId, key } = orderResponse.data;
      
          const options = {
            key: key, // Use Razorpay Key ID
            amount: orderData.totalAmount * 100,
            currency: 'INR',
            name: '',
            description: 'Order Payment',
            order_id: razorpayOrderId,
            handler: async function (response) {
              const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = response;
      
              if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature) {
                console.error("Missing payment details");
                return;
              }
      
              try {
                // Step 2: Verify payment
                const paymentVerification = await axios.post('http://localhost:5001/api/verify-payment', {
                  razorpay_payment_id,
                  razorpay_order_id,
                  razorpay_signature,
                });
      
                if (paymentVerification.status === 200 && paymentVerification.data.message === 'Payment verified successfully') {
                  // Step 3: Save order details
                  orderData.paymentInfo = {
                    paymentType: 'razorpay',
                    paymentId: razorpay_payment_id,
                    orderId: razorpay_order_id,
                    signature: razorpay_signature,
                  };
      
                  await axios.post('http://localhost:5001/api/userorder', orderData);
                  console.log('Order placed successfully!', response.data);
                //   alert('Order placed successfully!');
                  await clearMultipleStoresFromDB(['contactInformation', 'drawerData', 'orderDetails', 'paymentMode']);
                  navigate(`/${id}/user/confirmation`);
                } else {
                  alert('Payment verification failed. Please try again.');
                }
              } catch (error) {
                console.error('Payment verification failed:', error);
                alert('Payment verification failed. Please try again.');
              }
            },
            prefill: {
              name: orderData.contactInfo.name,
              email: orderData.contactInfo.email,
              contact: orderData.contactInfo.mobile,
            },
            notes: {
              address: 'Your Company Address',
            },
            theme: {
              color: '#3399cc',
            },
          };
      
          const rzp = new window.Razorpay(options);
          rzp.open();
        } catch (error) {
          console.error('Failed to initiate Razorpay payment:', error);
          alert('Failed to initiate payment. Please try again.');
        }
      };
      



    const placeOrder = async (orderData) => {
        try {
            const response = await axios.post('http://localhost:5001/api/userorder', orderData);
            console.log('Order placed successfully!', response.data);
            // alert('Order placed successfully!');
            await clearMultipleStoresFromDB(['contactInformation', 'drawerData', 'orderDetails', 'paymentMode']);
            navigate(`/${id}/user/confirmation`);
        } catch (error) {
            console.error('Failed to place order:', error);
            alert('Failed to place order. Please try again.');
        } finally {
            setIsPlacingOrder(false);
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
                        <p className="text-gray-600 mb-4">Select the option to check out with:</p>

                        <div className="flex space-x-4 mb-4">
                            <button
                                onClick={() => setFormType('guest')}
                                className="border w-1/2 lg:text-base text-sm border-orange-500 text-orange-500 lg:px-6 px-4 py-2 rounded-lg hover:bg-orange-500 hover:text-white"
                            >
                                Continue as a guest
                            </button>
                            <button
                                onClick={() => setFormType('login')}
                                className="bg-orange-500 w-1/2 lg:text-base text-sm text-white lg:px-6 px-4 py-2 rounded-lg hover:bg-orange-600"
                            >
                                Login
                            </button>
                        </div>

                        <div className="flex items-center space-x-2">
                            <hr className="flex-grow border-gray-300" />
                            <span>OR</span>
                            <hr className="flex-grow border-gray-300" />
                        </div>

                        <div className="mt-4 flex justify-center">
                            <div className='lg:text-lg text-base'>
                                Don't have an account?{' '}
                                <button
                                    onClick={handleRegisterClick}
                                    className="text-white rounded-md py-2 px-4 text-sm bg-black font-semibold"
                                >
                                    Sign up
                                </button>
                            </div>
                        </div>
                    </div>
                ) : formType === 'guest' ? (
                    <GuestForm goBack={() => setFormType(null)} />
                ) : (
                    <LoginForm goBack={() => setFormType(null)} />
                )}

                {/* Bill Summary Section */}
                <div className="w-full lg:w-[50%] mt-10 lg:mt-0 lg:ml-10 bg-white p-3 lg:p-6 border shadow">
                    <div className='border-2 px-3 py-2 mb-4'>
                        {drawerData.cartItems.length > 0 ? (
                            drawerData.cartItems.map((item, index) => (
                                <div key={index} className="flex justify-between items-center ">
                                    <div className="flex items-center py-1">
                                        <GrSquare
                                            className={`mr-2 size-3 ${item.veg ? 'text-green-500' : 'text-red-500'}`}
                                        />
                                        <span className='text-sm'>{item.name} x {item.quantity}</span>
                                    </div>
                                    <span className='text-sm'>₹{(item.price * item.quantity).toFixed(2)}</span>
                                </div>
                            ))
                        ) : (
                            <p className="text-center text-gray-500">No items in cart.</p>
                        )}
                    </div>

                    <div className='px-3 py-2 mb-5 shadow-lg'>
                        <div className="flex justify-between items-center">
                            <span className="text-gray-600 text-base">Items Total</span>
                            <span className="font-semibold">₹{drawerData.totalAmount.toFixed(2)}</span>
                        </div>
                        <hr className='w-full bg-slate-300 my-2' />
                        <div className="flex justify-between items-center">
                            <span className="text-lg text-gray-700 font-medium">Total</span>
                            <span className="text-lg font-medium text-gray-700">₹{drawerData.totalAmount.toFixed(2)}</span>
                        </div>
                    </div>

                    {/* Order Type */}
                    {drawerData.orderType && (
                        <div className="mb-4">
                            <span className="font-semibold">Order Type: </span>
                            <span>{drawerData.orderType}</span>
                        </div>
                    )}

                    {/* Payment Options */}
                    <div className="mb-6">
                        <h2 className="text-lg font-semibold mb-2">Choose Payment Method</h2>
                        <div className="flex items-center space-x-2 mb-4">
                            <input
                                type="radio"
                                id="cashOnDelivery"
                                name="paymentMode"
                                value="cashOnDelivery"
                                checked={paymentType === 'cashOnDelivery'}
                                onChange={(e) => handlePaymentTypeChange(e.target.value)}
                                className="text-orange-500 focus:ring-orange-500"
                            />
                            <label htmlFor="cashOnDelivery" className="text-gray-700">Cash on Delivery</label>
                        </div>
                        <div className="flex items-center space-x-2 mb-4">
                            <input
                                type="radio"
                                id="razorpay"
                                name="paymentMode"
                                value="razorpay"
                                checked={paymentType === 'razorpay'}
                                onChange={(e) => handlePaymentTypeChange(e.target.value)}
                                className="text-orange-500 focus:ring-orange-500"
                            />
                            <label htmlFor="razorpay" className="text-gray-700">Pay Online (Razorpay)</label>
                        </div>
                    </div>

                    {/* Place Order Button */}
                    <button
                        onClick={handlePlaceOrder}
                        disabled={isPlacingOrder || drawerData.cartItems.length === 0 || !paymentType}
                        className={`w-full py-2 rounded-md text-white ${isPlacingOrder || drawerData.cartItems.length === 0 || !paymentType
                                ? 'bg-gray-300 cursor-not-allowed'
                                : 'bg-green-500 hover:bg-green-600'
                            }`}
                    >
                        {isPlacingOrder ? 'Placing Order...' : 'Place Order'}
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


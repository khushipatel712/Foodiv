import React, { useState, useEffect } from "react";
import { BsFillPatchCheckFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { clearMultipleStoresFromDB } from "./IndexdDBUtils"; // Import useNavigate for redirection

const OrderConfirmation = () => {
  const [timer, setTimer] = useState(5); // Initial timer value (5 seconds)
  const navigate = useNavigate();
  const {id}= useParams(); // Initialize navigate function

  useEffect(() => {
    // Set up a countdown timer
    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 1) {
          clearInterval(interval);
          // Redirect to homepage when timer reaches zero
          clearMultipleStoresFromDB(['contactInformation', 'drawerData', 'orderDetails', 'paymentMode'])
          .then(() => navigate(`/${id}/user/menu`, { replace: true }))
          .catch((error) => {
              console.error("Failed to clear IndexedDB stores", error);
              navigate(`/${id}/user/menu`, { replace: true }); // Redirect even if clearing fails
          });
        }
        return prevTimer - 1;
      });
    }, 1000); // Update every second

    // Clean up interval on component unmount
    return () => clearInterval(interval);
  }, [navigate]);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-gray-100 rounded-lg shadow-lg p-8 sm:p-12 lg:p-20 w-2xl text-center">
        <div className="flex justify-center items-center mb-4">
          <BsFillPatchCheckFill className="text-orange-500 text-9xl" />
        </div>
        <h2 className="text-4xl font-bold text-gray-800 mb-2">Thank You!</h2>
        <p className="text-orange-600 text-2xl font-medium mb-4">
          Your order was placed successfully.
        </p>
        <p className="text-gray-500 text-base font-medium">
          You will be redirected to the homepage in {timer} seconds.
        </p>
      </div>
    </div>
  );
};

export default OrderConfirmation;

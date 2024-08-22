import React from "react";
import { BsFillPatchCheckFill } from "react-icons/bs";

const OrderConfirmation = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-gray-100 rounded-lg shadow-lg p-8 sm:p-12 lg:p-20  w-2xl text-center">
        <div className="flex justify-center items-center mb-4">
          <BsFillPatchCheckFill className="text-orange-500 text-9xl" />
        </div>
        <h2 className="text-4xl font-bold text-gray-800 mb-2">Thank You!</h2>
        <p className="text-orange-600 text-2xl font-medium mb-4">
          Your Order Placed successfully.
        </p>
        <p className="text-gray-500 text-base">
          You will redirect to homepage after 2 seconds
        </p>
      </div>
    </div>
  );
};

export default OrderConfirmation;

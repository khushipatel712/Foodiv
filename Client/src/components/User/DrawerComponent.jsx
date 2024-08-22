import React, {useState} from 'react';
import OrderType from './OrderType';

const DrawerComponent = ({ cartItems, totalAmount, onViewCart }) => {

   const [isOrderTypeOpen, setIsOrderTypeOpen]=useState(false);

   const handleOrderTypeClick=()=>{
             setIsOrderTypeOpen(true);
   }

   const handleCloseOrderType =()=>{
   setIsOrderTypeOpen(false);

   }

    return (
        <>
        <div className="fixed inset-x-0 bottom-0 bg-stone-800 text-white h-16 flex justify-between items-center px-32 shadow-lg z-60">
            <div>
                <h2 className="text-xl ">Total: ₹ {totalAmount}</h2>
                <p className="text-sm">Items Added: {cartItems.length}</p>
            </div>
            <button
                className="bg-orange-600 text-white px-3 py-1 rounded-lg hover:bg-orange-700"
                onClick={handleOrderTypeClick}
            >
                View Cart
            </button>
        </div>

        {isOrderTypeOpen && (
            <OrderType onClose={handleCloseOrderType}/>
        )}

        </>
    );
};

export default DrawerComponent;

import React, { useState, useEffect } from 'react';
import OrderType from './OrderType';
import { saveDrawerDataToDB, getDrawerDataFromDB } from './IndexdDBUtils'; // Update the path as necessary

const DrawerComponent = ({ cartItems, totalAmount }) => {
    const [isOrderTypeOpen, setIsOrderTypeOpen] = useState(false);
    const [drawerData, setDrawerData] = useState({ cartItems: [], totalAmount: 0 });

    // Load drawer data on component mount
    useEffect(() => {
        const loadDrawerData = async () => {
            try {
                const data = await getDrawerDataFromDB();
                console.log('Loaded drawer data:', data); // Log for debugging
                if (data && data.cartItems && data.cartItems.length > 0) {
                    setDrawerData(data);
                } else {
                    setDrawerData({ cartItems: [], totalAmount });
                }
            } catch (error) {
                console.error('Error fetching drawer data from IndexedDB:', error);
            }
        };

        loadDrawerData();
    }, []);

    // Update drawer data when cartItems or totalAmount changes
    useEffect(() => {
        setDrawerData({ cartItems, totalAmount });
    }, [cartItems, totalAmount]);

    const handleOrderTypeClick = async () => {
        try {
            // Save drawer data to IndexedDB
            await saveDrawerDataToDB({
                cartItems,
                totalAmount,
            });
            setIsOrderTypeOpen(true);
        } catch (error) {
            console.error('Error saving drawer data to IndexedDB:', error);
        }
    };

    const handleCloseOrderType = () => {
        setIsOrderTypeOpen(false);
    };

    // Render the drawer component only if there are items in the cart
    if (drawerData.cartItems.length === 0 && cartItems.length === 0) {
        return null;
    }

    return (
        <>
            <div className="fixed inset-x-0 bottom-0 bg-stone-800 text-white md:h-14 lg:h-16 h-12 py-2 flex justify-between items-center px-4 md:px-32 shadow-lg z-60">
                <div>
                    <h2 className="sm:text-xl text-base">
                        Total: ₹ {drawerData.totalAmount}
                    </h2>
                    <p className="text-sm">
                        Items Added: {drawerData.cartItems.length}
                    </p>
                </div>
                <button
                    className="bg-orange-600 text-white text-sm  sm:text-base px-3 py-1 rounded-lg hover:bg-orange-700"
                    onClick={handleOrderTypeClick}
                >
                    View Cart
                </button>
            </div>

            {isOrderTypeOpen && (
                <OrderType onClose={handleCloseOrderType} />
            )}
        </>
    );
};

export default DrawerComponent;

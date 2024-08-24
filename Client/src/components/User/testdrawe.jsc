import React, { useState, useEffect } from 'react';
import OrderType from './OrderType';
import { saveDrawerDataToDB, getDrawerDataFromDB } from './IndexdDBUtils';

const DrawerComponent = ({ onAddToCart }) => {
    const [isOrderTypeOpen, setIsOrderTypeOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [totalAmount, setTotalAmount] = useState('0.00');

    useEffect(() => {
        fetchDrawerData();
    }, []);

    useEffect(() => {
        // Listen for changes from the parent component
        if (onAddToCart) {
            onAddToCart(handleAddToCart);
        }
    }, [onAddToCart]);

    const fetchDrawerData = async () => {
        try {
            const data = await getDrawerDataFromDB();
            if (data && data.cartItems.length > 0) {
                const uniqueItems = combineAndGroupItems(data.cartItems);
                setCartItems(uniqueItems);
                setTotalAmount(data.totalAmount);
            }
        } catch (error) {
            console.error('Error fetching drawer data from IndexedDB:', error);
        }
    };

    const combineAndGroupItems = (items) => {
        const uniqueItems = {};
        items.forEach(item => {
            if (!uniqueItems[item.id]) {
                uniqueItems[item.id] = { ...item, quantity: 1 };
            } else {
                uniqueItems[item.id].quantity += 1;
            }
        });
        return Object.values(uniqueItems);
    };

    const handleAddToCart = (newItem) => {
        setCartItems(prevItems => {
            const updatedItems = [...prevItems];
            const existingItemIndex = updatedItems.findIndex(item => item.id === newItem.id);
            
            if (existingItemIndex !== -1) {
                updatedItems[existingItemIndex].quantity += 1;
            } else {
                updatedItems.push({ ...newItem, quantity: 1 });
            }

            const newTotalAmount = updatedItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);
            setTotalAmount(newTotalAmount);

            // Save updated data to IndexedDB
            saveDrawerDataToDB({ cartItems: updatedItems, totalAmount: newTotalAmount });

            return updatedItems;
        });
    };

    const handleOrderTypeClick = () => {
        setIsOrderTypeOpen(true);
    };

    const handleCloseOrderType = () => {
        setIsOrderTypeOpen(false);
    };

    // Render the drawer component only if there are items in the cart
    if (cartItems.length === 0) {
        return null;
    }

    return (
        <>
            <div className="fixed inset-x-0 bottom-0 bg-stone-800 text-white h-16 flex justify-between items-center px-32 shadow-lg z-60">
                <div>
                    <h2 className="text-xl ">Total: ₹ {totalAmount}</h2>
                    <p className="text-sm">Items Added: {cartItems.reduce((sum, item) => sum + item.quantity, 0)}</p>
                </div>
                <button
                    className="bg-orange-600 text-white px-3 py-1 rounded-lg hover:bg-orange-700"
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
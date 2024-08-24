import React, { useState, useEffect, useCallback } from 'react';
import OrderType from './OrderType';
import { saveDrawerDataToDB, getDrawerDataFromDB } from './IndexdDBUtils';

const DrawerComponent = ({ cartItems: propCartItems, totalAmount: propTotalAmount, onAddToCart }) => {
    const [isOrderTypeOpen, setIsOrderTypeOpen] = useState(false);
    const [localCartItems, setLocalCartItems] = useState([]);
    const [localTotalAmount, setLocalTotalAmount] = useState('0.00');

    useEffect(() => {
        fetchDrawerData();
    }, []);

    useEffect(() => {
        // Update local state when props change
        if (propCartItems && propCartItems.length > 0) {
            setLocalCartItems(prevItems => {
                const updatedItems = mergeAndUpdateItems(prevItems, propCartItems);
                const newTotalAmount = calculateTotalAmount(updatedItems);
                setLocalTotalAmount(newTotalAmount);

                // Save updated data to IndexedDB
                saveDrawerDataToDB({ cartItems: updatedItems, totalAmount: newTotalAmount });

                return updatedItems;
            });
        }
    }, [propCartItems]);

    useEffect(() => {
        if (onAddToCart) {
            onAddToCart(handleAddToCart);
        }
    }, [onAddToCart]);

    const fetchDrawerData = async () => {
        try {
            const data = await getDrawerDataFromDB();
            if (data && data.cartItems.length > 0) {
                const uniqueItems = combineAndGroupItems(data.cartItems);
                setLocalCartItems(uniqueItems);
                setLocalTotalAmount(data.totalAmount);
            }
        } catch (error) {
            console.error('Error fetching drawer data from IndexedDB:', error);
        }
    };

    const combineAndGroupItems = (items) => {
        const uniqueItems = {};
        items.forEach(item => {
            if (!uniqueItems[item.id]) {
                uniqueItems[item.id] = { ...item, quantity: item.quantity || 1 };
            } else {
                uniqueItems[item.id].quantity += item.quantity || 1;
            }
        });
        return Object.values(uniqueItems);
    };

    const mergeAndUpdateItems = (existingItems, newItems) => {
        const existingItemMap = existingItems.reduce((map, item) => {
            map[item.id] = item;
            return map;
        }, {});

        newItems.forEach(item => {
            if (existingItemMap[item.id]) {
                existingItemMap[item.id].quantity += item.quantity || 1;
            } else {
                existingItemMap[item.id] = { ...item, quantity: item.quantity || 1 };
            }
        });

        return Object.values(existingItemMap);
    };

    const calculateTotalAmount = (items) => {
        return items.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);
    };

    const handleAddToCart = useCallback((newItem) => {
        setLocalCartItems(prevItems => {
            const existingItemIndex = prevItems.findIndex(item => item.id === newItem.id);

            if (existingItemIndex !== -1) {
                // Update quantity if item already exists
                const updatedItems = [...prevItems];
                updatedItems[existingItemIndex].quantity += 1;
                const newTotalAmount = calculateTotalAmount(updatedItems);
                setLocalTotalAmount(newTotalAmount);

                // Save updated data to IndexedDB
                saveDrawerDataToDB({ cartItems: updatedItems, totalAmount: newTotalAmount });

                return updatedItems;
            } else {
                // Add new item if it doesn't exist
                const updatedItems = [...prevItems, { ...newItem, quantity: 1 }];
                const newTotalAmount = calculateTotalAmount(updatedItems);
                setLocalTotalAmount(newTotalAmount);

                // Save updated data to IndexedDB
                saveDrawerDataToDB({ cartItems: updatedItems, totalAmount: newTotalAmount });

                return updatedItems;
            }
        });
    }, []);

    const handleOrderTypeClick = async () => {
        try {
            // Save the current state to IndexedDB before opening OrderType
            await saveDrawerDataToDB({ 
                cartItems: localCartItems, 
                totalAmount: localTotalAmount 
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
    if (localCartItems.length === 0) {
        return null;
    }

    return (
        <>
            <div className="fixed inset-x-0 bottom-0 bg-stone-800 text-white h-16 flex justify-between items-center px-32 shadow-lg z-60">
                <div>
                    <h2 className="text-xl ">Total: ₹ {localTotalAmount}</h2>
                    <p className="text-sm">Items Added: {localCartItems.reduce((sum, item) => sum + item.quantity, 0)}</p>
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

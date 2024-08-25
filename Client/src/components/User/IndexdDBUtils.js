import { openDB } from 'idb';

// Initialize the IndexedDB database
const initDB = async () => {
    const db = await openDB('menuDB', 8, { // Incremented the version to 7
        upgrade(db, oldVersion) {
            if (oldVersion < 1) {
                db.createObjectStore('cartItems', { keyPath: '_id' });
            }
            if (oldVersion < 2) {
                if (!db.objectStoreNames.contains('orderDetails')) {
                    db.createObjectStore('orderDetails', { keyPath: 'id' });
                }
            }
            if (oldVersion < 3) {
                if (!db.objectStoreNames.contains('drawerData')) {
                    db.createObjectStore('drawerData', { keyPath: 'key' });
                }
            }
            // if (oldVersion < 4) {
            //     if (!db.objectStoreNames.contains('paymentData')) { // Updated object store name
            //         db.createObjectStore('paymentData', { keyPath: 'key' });
            //     }
            // }
        },
    });
    return db;
};

// Add an item to IndexedDB
export const addItemToDB = async (item) => {
    const db = await initDB();
    if (!item._id) {
        throw new Error('Item must have an _id property');
    }
    await db.put('cartItems', item);
};

// Retrieve all items from IndexedDB
export const getItemsFromDB = async () => {
    const db = await initDB();
    return db.getAll('cartItems');
};

// Remove an item from IndexedDB
export const removeItemFromDB = async (itemId) => {
    const db = await initDB();
    await db.delete('cartItems', itemId);
};

// Add order type to IndexedDB
export const addOrderTypeToDB = async (orderType) => {
    const db = await initDB();
    const id = 'orderType'; // Single key for order type
    await db.put('orderDetails', { id, orderType });
};

// Add payment mode type to IndexedDB
// export const addPaymentModeTypeToDB = async (paymentMode) => {
//     const db = await initDB();
//     const key = 'paymentType'; // Updated key
//     await db.put('paymentData', { key, paymentMode });
// };

// // Retrieve payment mode from IndexedDB
// export const getPaymentModeFromDB = async () => {
//     const db = await initDB();
//     const payment = await db.get('paymentData', 'paymentType'); // Updated object store name
//     return payment ? payment.paymentMode : null;
// };
// Retrieve order type from IndexedDB
export const getOrderTypeFromDB = async () => {
    const db = await initDB();
    const order = await db.get('orderDetails', 'orderType');
    return order ? order.orderType : null;
};

// Add or update drawer data in IndexedDB
export const saveDrawerDataToDB = async (data) => {
    const db = await initDB();

    // Retrieve the order type from IndexedDB
    const orderType = await getOrderTypeFromDB();

    // Combine the drawer data with the order type
    const drawerDataWithOrderType = {
        key: 'drawerData',
        ...data,
        orderType: orderType || null, // Add orderType to drawerData, default to null if not found
    };

    // Save the combined data back to IndexedDB
    await db.put('drawerData', drawerDataWithOrderType);
};

// Retrieve drawer data from IndexedDB
export const getDrawerDataFromDB = async () => {
    const db = await initDB();
    const data = await db.get('drawerData', 'drawerData');
    return data ? { cartItems: data.cartItems, totalAmount: data.totalAmount, orderType:data.orderType } : { cartItems: [], totalAmount: 0 , orderType : null};
};

// Update drawer data in IndexedDB
export const updateDrawerDataInDB = async (updatedCartItems, updatedTotalAmount) => {
    const db = await initDB();

    // Retrieve the current order type from IndexedDB
    const orderType = await getOrderTypeFromDB();

    // Create the updated data object with the order type
    const data = {
        key: 'drawerData',
        cartItems: updatedCartItems,
        totalAmount: updatedTotalAmount,
        orderType: orderType || null, // Include orderType, default to null if not found
    };

    // Save the updated data back to IndexedDB
    await db.put('drawerData', data);
};

import { openDB } from 'idb';

// Initialize the IndexedDB database
const initDB = async () => {
    const db = await openDB('menuDB', 3, { // Incremented the version to 3
        upgrade(db, oldVersion) {
            if (oldVersion < 1) {
                // Initial creation of the object store for cart items
                db.createObjectStore('cartItems', { keyPath: '_id' });
            }
            if (oldVersion < 2) {
                // Create or update object store for order details
                if (!db.objectStoreNames.contains('orderDetails')) {
                    db.createObjectStore('orderDetails', { keyPath: 'id' });
                }
            }
            if (oldVersion < 3) {
                // Create or update object store for drawer data
                if (!db.objectStoreNames.contains('drawerData')) {
                    db.createObjectStore('drawerData', { keyPath: 'key' });
                }
            }
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

// Retrieve order type from IndexedDB
export const getOrderTypeFromDB = async () => {
    const db = await initDB();
    const order = await db.get('orderDetails', 'orderType');
    return order ? order.orderType : null;
};

// Add or update drawer data in IndexedDB
export const saveDrawerDataToDB = async (data) => {
    const db = await initDB();
    await db.put('drawerData', { key: 'drawerData', ...data });
};

// Retrieve drawer data from IndexedDB
export const getDrawerDataFromDB = async () => {
    const db = await initDB();
    const data = await db.get('drawerData', 'drawerData');
    return data ? { cartItems: data.cartItems, totalAmount: data.totalAmount } : { cartItems: [], totalAmount: 0 };
};

// Update drawer data in IndexedDB
export const updateDrawerDataInDB = async (updatedCartItems, updatedTotalAmount) => {
    const db = await initDB();
    const data = {
        key: 'drawerData',
        cartItems: updatedCartItems,
        totalAmount: updatedTotalAmount
    };
    await db.put('drawerData', data);
};

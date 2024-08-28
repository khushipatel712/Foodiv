import { openDB } from 'idb';

// Initialize the IndexedDB database
const initDB = async () => {
    const db = await openDB('menuDB', 11, { 
        upgrade(db, oldVersion) {
            try{

           
            db.createObjectStore('paymentDetail1s',{ keyPath: '_id' });
        }catch(err){
            console.log(err);
        }
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
            if (oldVersion < 9) {
                if (!db.objectStoreNames.contains('paymentMode')) { 
                    db.createObjectStore('paymentMode', { keyPath: 'key' });
                }
            }

            if (oldVersion < 10) {
                if (!db.objectStoreNames.contains('contactInformation')) {
                    db.createObjectStore('contactInformation', { keyPath: 'id' });
                }
            }

            // if(oldVersion <10){
            //     if (!db.objectStoreNames.contains('contactInformation')) {
            //         db.createObjectStore('contactInformation', { keyPath: 'key' }); 
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

export const updateItemInDB = async (item) => {
    const db = await initDB();
    if (!item._id) {
        throw new Error('Item must have an _id property');
    }

    // Check if the item exists in the database before updating
    const existingItem = await db.get('cartItems', item._id);
    if (!existingItem) {
        throw new Error(`Item with _id ${item._id} does not exist`);
    }

    await db.put('cartItems', item);  // Updates the item with the same _id
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
export const addPaymentTypeToDB = async (paymentType) => {
    const db = await initDB();
    const key = 'paymentType'; // Updated key
    await db.put('paymentMode', { key, paymentType });
};

// // Retrieve payment mode from IndexedDB
export const getPaymentTypeFromDB = async () => {
    const db = await initDB();
    const payment = await db.get('paymentMode', 'paymentType');
    // console.log(payment) // Updated object store name
    return payment ;
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

    // Retrieve the order type, payment type, and contact info from IndexedDB
    const orderType = await getOrderTypeFromDB();
    const paymentType = await getPaymentTypeFromDB();
    const contactInfo = await getContactInformationFromDB();

    // Combine the drawer data with the order type, payment type, and contact info
    const drawerDataWithOrderType = {
        key: 'drawerData',
        ...data,
        orderType: orderType || null, // Default to null if orderType is not found
        paymentType: paymentType || null, // Default to null if paymentType is not found
        contactInfo: contactInfo || null, // Default to null if contactInfo is not found
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

    // Retrieve the current order type, payment type, and contact info from IndexedDB
    const orderType = await getOrderTypeFromDB();
    const paymentType = await getPaymentTypeFromDB();
    const contactInfo = await getContactInformationFromDB();

    // Create the updated data object with the order type, payment type, and contact info
    const data = {
        key: 'drawerData',
        cartItems: updatedCartItems,
        totalAmount: updatedTotalAmount,
        orderType: orderType , // Default to null if orderType is not found
        paymentType: paymentType , // Default to null if paymentType is not found
        contactInfo: contactInfo  // Default to null if contactInfo is not found
    };

    // Save the updated data back to IndexedDB
    await db.put('drawerData', data);
};


export const saveContactInformationToDB = async (contactInfo) => {
    const db = await initDB();
  const id='contactInfo'
    await db.put('contactInformation', {id, contactInfo});
};


export const getContactInformationFromDB = async () => {
    const db = await initDB();
    return db.get('contactInformation', 'contactInfo');
};
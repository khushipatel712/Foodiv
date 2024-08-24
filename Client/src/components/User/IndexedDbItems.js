import { useEffect, useState } from 'react';

export const useIndexedDB = (dbName, storeName) => {
  const [db, setDb] = useState(null);

  useEffect(() => {
    const request = indexedDB.open(dbName, 1);

    request.onerror = (event) => {
      console.error('Database error:', event.target.errorCode);
    };

    request.onsuccess = (event) => {
      setDb(event.target.result);
    };

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      db.createObjectStore(storeName, { keyPath: 'id' });
    };
  }, [dbName, storeName]);

  const addItem = (item) => {
    if (db) {
      const transaction = db.transaction([storeName], 'readwrite');
      const objectStore = transaction.objectStore(storeName);
      objectStore.add(item);

      transaction.oncomplete = () => {
        console.log('Item added');
      };

      transaction.onerror = (event) => {
        console.error('Transaction error:', event.target.errorCode);
      };
    }
  };

  const getItem = (id, callback) => {
    if (db) {
      const transaction = db.transaction([storeName]);
      const objectStore = transaction.objectStore(storeName);
      const request = objectStore.get(id);

      request.onsuccess = (event) => {
        callback(event.target.result);
      };

      request.onerror = (event) => {
        console.error('Request error:', event.target.errorCode);
      };
    }
  };

  const updateItem = (item) => {
    if (db) {
      const transaction = db.transaction([storeName], 'readwrite');
      const objectStore = transaction.objectStore(storeName);
      objectStore.put(item);

      transaction.oncomplete = () => {
        console.log('Item updated');
      };

      transaction.onerror = (event) => {
        console.error('Transaction error:', event.target.errorCode);
      };
    }
  };

  const deleteItem = (id) => {
    if (db) {
      const transaction = db.transaction([storeName], 'readwrite');
      const objectStore = transaction.objectStore(storeName);
      objectStore.delete(id);

      transaction.oncomplete = () => {
        console.log('Item deleted');
      };

      transaction.onerror = (event) => {
        console.error('Transaction error:', event.target.errorCode);
      };
    }
  };
  return { addItem, getItem, updateItem, deleteItem };
};

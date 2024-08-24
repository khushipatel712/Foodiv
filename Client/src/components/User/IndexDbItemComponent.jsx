import React, { useState } from 'react';
import { useIndexedDB } from './IndexedDbItems'; // Assuming you saved the hook as useIndexedDB.js

const App = () => {
  const { addItem, getItem, updateItem, deleteItem } = useIndexedDB('MyDatabase', 'MyObjectStore');
  const [data, setData] = useState(null);

  const handleAddItem = () => {
    addItem({ id: 1, name: 'John Doe', email: 'john.doe@example.com' });
  };

  const handleGetItem = () => {
    getItem(1, (result) => {
      setData(result);
    });
  };

  const handleUpdateItem = () => {
    updateItem({ id: 1, name: 'John Smith', email: 'john.smith@example.com' });
  };

  const handleDeleteItem = () => {
    deleteItem(1);
  };

  return (
    <div>
      <h1>IndexedDB with React</h1>
      <button onClick={handleAddItem}>Add Item</button>
      <button onClick={handleGetItem}>Get Item</button>
      <button onClick={handleUpdateItem}>Update Item</button>
      <button onClick={handleDeleteItem}>Delete Item</button>

      {data && (
        <div>
          <h2>Retrieved Data:</h2>
          <p>ID: {data.id}</p>
          <p>Name: {data.name}</p>
          <p>Email: {data.email}</p>
        </div>
      )}
    </div>
  );
};

export default App;
